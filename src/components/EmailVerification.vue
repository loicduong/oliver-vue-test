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
        Verify Email
      </v-card-title>

      <v-form @submit.prevent="verifyCode" class="flex-grow-1">
        <v-text-field
            v-model="email"
            label="Email"
            type="email"
            prepend-inner-icon="mdi-email-outline"
            class="mt-2"
        />
        <v-text-field
            v-model="code"
            label="Verification Code"
            prepend-inner-icon="mdi-shield-key-outline"
            class="mt-2"
        />

        <v-btn
            :loading="loading"
            type="submit"
            color="success"
            class="mt-4"
            block
        >
          Verify
        </v-btn>

        <v-alert
            v-if="message"
            class="mt-4"
            :type="messageType"
            variant="tonal"
        >
          {{ message }}
        </v-alert>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { authHandler } from '@/services/authHandler'

const email = ref('')
const code = ref('')
const message = ref('')
const messageType = ref('success') // success or error
const loading = ref(false)
const router = useRouter()

onMounted(() => {
  const savedEmail = localStorage.getItem('registeredEmail')
  if (savedEmail) email.value = savedEmail
})

const verifyCode = async () => {
  loading.value = true
  message.value = ''
  try {
    await authHandler.confirmSignUp(email.value, code.value)
    message.value = 'Verification successful!'
    messageType.value = 'success'
    localStorage.removeItem('registeredEmail')
    setTimeout(() => {
      router.push('/log-in')
    }, 1500)
  } catch (err) {
    console.error(err)
    message.value = err.message
    messageType.value = 'error'
    if (
        err.code === 'UserNotFoundException' ||
        err.code === 'CodeMismatchException'
    ) {
      setTimeout(() => {
        router.push('/sign-up')
      }, 1500)
    }
  } finally {
    loading.value = false
  }
}
</script>

