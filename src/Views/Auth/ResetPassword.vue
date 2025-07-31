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
        Reset Password
      </v-card-title>

      <v-form @submit.prevent="resetPassword" class="flex-grow-1">
        <v-text-field
            v-model="email"
            label="Email"
            type="email"
            variant="outlined"
            prepend-inner-icon="mdi-email-outline"
            class="mt-3"
        />

        <v-text-field
            v-model="code"
            label="Verification Code"
            variant="outlined"
            prepend-inner-icon="mdi-shield-key-outline"
            class="mt-2"
        />

        <v-text-field
            v-model="newPassword"
            label="New Password"
            type="password"
            variant="outlined"
            prepend-inner-icon="mdi-lock-reset"
            class="mt-2"
        />

        <v-btn type="submit" color="success" class="mt-4" block :loading="loading">
          Reset Password
        </v-btn>

        <v-alert
            v-if="message"
            class="mt-4"
            :type="status"
            border
            variant="tonal"
        >
          {{ message }}
        </v-alert>
      </v-form>

      <div class="text-caption text-center mt-6">
        Go back to
        <RouterLink to="/log-in" class="text-primary text-decoration-underline">
          Login
        </RouterLink>
      </div>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
// @ts-nocheck

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { authHandler } from '@/services/authHandler'

const email = ref('')
const code = ref('')
const newPassword = ref('')
const message = ref('')
const status = ref(null) // 'success' | 'error' | null
const loading = ref(false)
const router = useRouter()

onMounted(() => {
  const savedEmail = localStorage.getItem('resetEmail')
  if (savedEmail) email.value = savedEmail
})

const resetPassword = async () => {
  message.value = ''
  status.value = null
  loading.value = true

  try {
    await authHandler.confirmPassword(email.value, code.value, newPassword.value)
    message.value = 'Password reset successfully!'
    status.value = 'success'
    setTimeout(() => router.push('/log-in'), 1500)
  } catch (err) {
    message.value = err.message
    status.value = 'error'
  } finally {
    loading.value = false
  }
}
</script>
