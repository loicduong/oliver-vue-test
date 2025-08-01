<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <v-card
        class="pa-6 d-flex flex-column justify-center"
        max-width="600"
        min-width="500"
        min-height="400"
        elevation="10"
        rounded="l"
    >
      <v-card-title class="text-h5 font-weight-bold text-center">
        Complete Your Profile
      </v-card-title>

      <v-form @submit.prevent="submitProfile" validate-on="input" class="flex-grow-1">
        <v-text-field
            v-model="username"
            label="Username"
            variant="outlined"
            :rules="[rules.required, rules.username]"
            class="mt-3"
        />

        <v-select
            v-model="role"
            :items="roles"
            label="Select Role"
            variant="outlined"
            :rules="[rules.required]"
            class="mt-2"
        />

        <v-btn
            type="submit"
            color="primary"
            class="mt-4"
            block
            size="large"
            :loading="loading"
        >
          Save Profile
        </v-btn>

        <v-alert
            v-if="message"
            class="mt-4"
            :type="messageType"
            border
            variant="tonal"
            density="comfortable"
        >
          {{ message }}
        </v-alert>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authHandler } from '@/services/authHandler'

const username = ref('')
const role = ref('')
const roles = ['Creator', 'Fan']
const message = ref('')
const messageType = ref('error')
const loading = ref(false)
const router = useRouter()

const rules = {
  required: v => !!v || 'This field is required',
  username: v =>
      /^[a-zA-Z0-9_]{3,20}$/.test(v) ||
      'Username must be 3–20 characters, letters/numbers/underscores only',
}

const submitProfile = async () => {
  message.value = ''
  loading.value = true
  try {
    await authHandler.updateProfileAttributes({
      name: username.value,
      'custom:role': role.value,
    })

    messageType.value = 'success'
    message.value = 'Profile updated successfully!'
    setTimeout(() => {
      router.push('/user/kyc-verification')
    }, 1500)
  } catch (err) {
    console.error(err)
    messageType.value = 'error'
    message.value = err.message || 'Profile update failed'
  } finally {
    loading.value = false
  }
}
</script>
