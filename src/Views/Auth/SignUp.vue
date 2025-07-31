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
        Create an Account
      </v-card-title>

      <v-form @submit.prevent="handleRegister" validate-on="input" class="flex-grow-1">
        <v-text-field
            v-model="email"
            label="Email"
            type="email"
            :rules="[rules.required, rules.email]"
            class="mt-3"
        />

        <v-text-field
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="showPassword = !showPassword"
            :rules="[rules.required]"
            class="mt-2"
        />

        <v-btn type="submit" color="primary" class="mt-4" block :loading="loading">
          Register
        </v-btn>

        <v-alert
            v-if="message"
            class="mt-4"
            :type="messageType"
            variant="tonal"
            border="start"
            density="compact"
        >
          {{ message }}
        </v-alert>
      </v-form>

      <div class="text-caption text-center mt-6">
        Already have an account?
        <RouterLink to="/log-in" class="text-primary text-decoration-underline">
          Login
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
const password = ref('')
const showPassword = ref(false)
const message = ref('')
const messageType = ref('error')
const loading = ref(false)
const router = useRouter()

const rules = {
  required: v => !!v || 'This field is required',
  email: v => /.+@.+\..+/.test(v) || 'Enter a valid email',
}

const handleRegister = async () => {
  message.value = ''
  messageType.value = 'error'
  loading.value = true

  try {
    await authHandler.register(email.value, password.value)
    localStorage.setItem('registeredEmail', email.value)
    messageType.value = 'success'
    message.value = 'Account created successfully! Redirecting...'
    setTimeout(() => {
      router.push('/verify')
    }, 1500)
  } catch (err) {
    message.value = err.message
    messageType.value = 'error'
    console.error(err)
  } finally {
    loading.value = false
  }
}
</script>
