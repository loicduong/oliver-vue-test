<template>
  <v-dialog v-model="isOpen" max-width="420" persistent>
    <v-card class="pa-6" elevation="10" rounded="xl" min-width="360" min-height="360">
      <v-card-title class="text-h6 font-weight-bold text-center">
        Change Password
      </v-card-title>

      <v-form @submit.prevent="handleChangePassword" validate-on="input">
        <v-text-field
            v-model="currentPassword"
            label="Current Password"
            type="password"
            prepend-inner-icon="mdi-lock-outline"
            :rules="[rules.required]"
            class="mt-2"
        />
        <v-text-field
            v-model="newPassword"
            label="New Password"
            type="password"
            prepend-inner-icon="mdi-lock-reset"
            :rules="[rules.required]"
            class="mt-2"
        />

        <v-btn
            type="submit"
            color="primary"
            block
            class="mt-4"
            :loading="loading"
        >
          Update Password
        </v-btn>

        <v-alert
            v-if="message"
            class="mt-4"
            :type="message.startsWith('✅') ? 'success' : 'error'"
            variant="tonal"
        >
          {{ message }}
        </v-alert>
      </v-form>

      <v-card-actions class="justify-end mt-4">
        <v-btn variant="text" @click="closeDialog">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import { authHandler } from '@/services/authHandler'

const props = defineProps({
  modelValue: Boolean
})
const emit = defineEmits(['update:modelValue'])

const isOpen = ref(props.modelValue)
watch(() => props.modelValue, val => (isOpen.value = val))
watch(isOpen, val => emit('update:modelValue', val))

const currentPassword = ref('')
const newPassword = ref('')
const loading = ref(false)
const message = ref('')

const rules = {
  required: v => !!v || 'This field is required'
}

const handleChangePassword = async () => {
  loading.value = true
  message.value = ''
  try {
    await authHandler.changePassword(currentPassword.value, newPassword.value)
    message.value = '✅ Password updated successfully!'

    currentPassword.value = ''
    newPassword.value = ''
  } catch (err) {
    console.error(err)
    message.value = '❌ ' + err.message
  } finally {
    loading.value = false
  }
}

const closeDialog = () => {
  isOpen.value = false
  currentPassword.value = ''
  newPassword.value = ''
  message.value = ''
}
</script>
