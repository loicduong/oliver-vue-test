<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <v-card
        class="pa-6 d-flex flex-column justify-center"
        max-width="600"
        min-width="500"
        min-height="300"
        elevation="10"
        rounded="l"
    >
      <v-card-title class="text-h5 font-weight-bold text-center">
        Forgot Password
      </v-card-title>

      <v-form @submit.prevent="submitEmail" class="flex-grow-1">
        <v-text-field
            v-model="email"
            label="Email"
            type="email"
            variant="outlined"
            prepend-inner-icon="mdi-email-outline"
            :rules="[rules.required, rules.email]"
            class="mt-4"
        />

        <v-btn type="submit" color="primary" class="mt-4" block :loading="loading">
          Send Verification Code
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
        Remembered your password?
        <RouterLink to="/log-in" class="text-primary text-decoration-underline">
          Go back to login
        </RouterLink>
      </div>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
// @ts-nocheck

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authHandler } from '@/services/authHandler'

const email = ref('')
const message = ref('')
const status = ref(null)
const loading = ref(false)
const router = useRouter()

const rules = {
  required: v => !!v || 'This field is required',
  email: v => /.+@.+\..+/.test(v) || 'Enter a valid email',
}

const submitEmail = async () => {
  message.value = ''
  status.value = null
  loading.value = true
  try {
    await authHandler.forgotPassword(email.value)
    message.value = 'Code sent! Please check your email.'
    status.value = 'success'

    localStorage.setItem('resetEmail', email.value)
    setTimeout(() => router.push('/reset-password'), 1500)
  } catch (err) {
    message.value = err.message
    status.value = 'error'
  } finally {
    loading.value = false
  }
}
</script>
