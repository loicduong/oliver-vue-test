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
        Complete KYC Verification
      </v-card-title>

      <v-form class="mt-4">
        <v-checkbox
            v-model="kyc"
            label="I confirm my KYC details"
            @change="onKycChange"
            :disabled="saving"
        />

        <v-alert
            v-if="attributesLoaded && !kyc"
            type="info"
            variant="tonal"
            density="comfortable"
            class="mt-4"
        >
          Please complete your KYC to proceed to the dashboard.
        </v-alert>

        <v-alert
            v-if="attributesLoaded && !isEligibleRole"
            type="error"
            variant="tonal"
            class="mt-4"
        >
          Your role is not permitted to access the dashboard.
        </v-alert>

        <v-btn
            v-if="kyc && isEligibleRole"
            color="primary"
            class="mt-4"
            block
            size="large"
            :loading="saving"
            @click="goToDashboard"
        >
          Go to Dashboard
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { authHandler } from '@/services/authHandler'

const kyc = ref(false)
const role = ref('')
const saving = ref(false)
const isEligibleRole = ref(false)
const attributesLoaded = ref(false)

const router = useRouter()

const getCurrentUserAttributes = () => {
  const user = authHandler.getCurrentUser()
  if (!user) return

  user.getSession((err, session) => {
    if (err || !session.isValid()) return
    user.getUserAttributes((err, attributes) => {
      if (err) return

      const attrMap = Object.fromEntries(attributes.map(attr => [attr.getName(), attr.getValue()]))
      kyc.value = attrMap['custom:kyc'] === 'true'
      role.value = attrMap['custom:role'] || ''
      isEligibleRole.value = ['fan', 'creator'].includes(role.value.toLowerCase())
      attributesLoaded.value = true
    })
  })
}


const onKycChange = async () => {
  if (!kyc.value) return
  saving.value = true
  try {
    await authHandler.updateProfileAttributes({ 'custom:kyc': 'true' })
  } catch (e) {
    console.error('Failed to update KYC:', e)
  } finally {
    saving.value = false
  }
}

const goToDashboard = () => {
  router.push('/dashboard')
}

onMounted(() => {
  getCurrentUserAttributes()
})
</script>
