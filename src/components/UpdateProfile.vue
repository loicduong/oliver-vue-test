<template>
  <v-dialog v-model="dialogVisible" max-width="500">
    <v-card>
      <v-card-title class="text-h6">Update Profile</v-card-title>

      <v-form @submit.prevent="updateProfile" class="pa-4" validate-on="input">
        <v-text-field
            v-model="username"
            label="Username"
            prepend-inner-icon="mdi-account-circle"
            variant="outlined"
            readonly
        />

        <v-select
            v-model="role"
            label="Role"
            prepend-inner-icon="mdi-account-badge"
            :items="['creator', 'vendor', 'agent', 'customer']"
            variant="outlined"
            :rules="[rules.required]"
        />

        <v-checkbox
            v-model="kyc"
            label="KYC Status"
            color="primary"
            class="mt-3"
        />

        <v-btn
            type="submit"
            color="primary"
            class="mt-4"
            block
            :loading="loading"
        >
          Update
        </v-btn>

        <v-alert
            v-if="message"
            class="mt-4"
            :type="status"
            border
            variant="tonal"
            density="comfortable"
        >
          {{ message }}
        </v-alert>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { authHandler } from '@/services/authHandler'

const props = defineProps({
  modelValue: Boolean
})
const emit = defineEmits(['update:modelValue', 'updated'])

const dialogVisible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const router = useRouter()

const username = ref('')
const role = ref('')
const kyc = ref(false)

const message = ref('')
const status = ref(null)
const loading = ref(false)

const rules = {
  required: v => !!v || 'This field is required'
}

const loadUser = async () => {
  try {
    const userDetails = await authHandler.getCurrentUserAttributesMap()
    username.value = userDetails.email || ''
    role.value = userDetails.role || ''
    kyc.value = userDetails.kyc || false
    message.value = ''
    status.value = null
  } catch (err) {
    message.value = err.message || 'Failed to load user'
    status.value = 'error'
  }
}

watch(() => props.modelValue, (val) => {
  if (val) loadUser()
})

const updateProfile = async () => {
  loading.value = true
  message.value = ''
  status.value = null

  try {
    await authHandler.updateProfileAttributes({
      'custom:role': role.value,
      'custom:kyc': kyc.value.toString()
    })

    message.value = 'Profile updated successfully'
    status.value = 'success'

    if (!kyc.value) {
      dialogVisible.value = false
      // setTimeout(() => router.push('/user/kyc-verification'), 1000)
    } else {
      // Refresh UI or emit update otherwise
      emit('updated')
      dialogVisible.value = false
    }

  } catch (err) {
    message.value = err.message || 'Failed to update profile'
    status.value = 'error'
    console.error(err)
  } finally {
    loading.value = false
  }
}
</script>
