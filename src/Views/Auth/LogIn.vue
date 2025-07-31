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
        {{ getText('login.loginTitle') }}
      </v-card-title>

      <v-form @submit.prevent="login" validate-on="input" class="flex-grow-1">
        <v-text-field
            v-model="email"
            :label="getText('login.email')"
            type="email"
            variant="outlined"
            :rules="[rules.required, rules.email]"
            class="mt-3"
        />

        <v-text-field
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            :label="getText('login.password')"
            variant="outlined"
            :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append-inner="showPassword = !showPassword"
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
          {{ getText('login.loginButton') }}
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

      <div class="text-caption text-center mt-6">
        {{ getText('login.noAccount') }}
        <RouterLink to="/sign-up" class="text-primary text-decoration-underline">
          {{ getText('login.signUp') }}
        </RouterLink>
      </div>

      <div class="text-caption text-center mt-2">
        {{ getText('login.forgotPassword') }}
        <RouterLink to="/forgot-password" class="text-primary text-decoration-underline">
          {{ getText('login.resetPassword') }}
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
import { getText } from '@/i18n/TranslationHandler'

const email = ref('')
const password = ref('')
const message = ref('')
const messageType = ref('error')
const loading = ref(false)
const showPassword = ref(false)

const router = useRouter()

const rules = {
  required: v => !!v || 'This field is required',
  email: v => /.+@.+\..+/.test(v) || 'Enter a valid email',
}

const login = async () => {
  loading.value = true
  message.value = ''

  try {
    await authHandler.login(email.value, password.value)

    // Fetch current user attributes
    const userDetails = await authHandler.getCurrentUserAttributesMap()

    console.log('userDetails', userDetails)

    const hasUsername = !!userDetails.username
    const hasRole = !!userDetails.role

    messageType.value = 'success'
    message.value = 'Login successful! Redirecting...'

    setTimeout(() => {
      if (!hasUsername || !hasRole) {
        router.push('/dashboard')
      } else {
        router.push('/dashboard')
      }
    }, 1000)

  } catch (err) {
    console.error(err)
    messageType.value = 'error'
    message.value = err.message || 'Login failed'
  } finally {
    loading.value = false
  }
}
</script>
