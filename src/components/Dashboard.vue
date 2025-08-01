<template>
  <v-container class="fill-height d-flex justify-center align-center">
    <v-card class="pa-4" max-width="500" elevation="6" rounded="lg">
      <v-card-title>Dashboard</v-card-title>

      <v-card-text>
        <p><strong>Email:</strong> {{ user?.email || 'Unknown' }}</p>
        <p><strong>Role:</strong> {{ user?.['custom:role'] || 'N/A' }}</p>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn color="error" @click="logout">Logout</v-btn>
      </v-card-actions>
    </v-card>

    <!-- Dialogs -->
    <ChangePasswordDialog v-model="showChangePassword" />
    <UpdateProfileDialog v-model="showUpdateProfile" :user="user" @updated="onProfileUpdated" />
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { authHandler } from '@/services/authHandler'
import ChangePasswordDialog from '@/components/ChangePasswordDialog.vue'
import UpdateProfileDialog from '@/components/UpdateProfile.vue'

const user = ref(null)
const router = useRouter()
const showUpdateProfile = ref(false)
const showChangePassword = ref(false)

onMounted(() => {
  user.value = authHandler.getDecodedToken()
})

const onProfileUpdated = () => {
  user.value = authHandler.getDecodedToken()
}

const logout = () => {
  authHandler.logout()
  router.push('/log-in')
}
</script>
