<template>
  <v-container fluid class="pa-0 fill-height d-flex">
    <!-- Sidebar Navigation -->
    <v-navigation-drawer
        permanent
        width="80"
        class="d-flex flex-column justify-space-between"
        style="background-color: #1e1e1e;"
    >
      <!-- Top -->
      <div class="d-flex flex-column align-center pt-4">
        <RouterLink to="/dashboard">
          <v-icon size="32" color="white">mdi-view-dashboard</v-icon>
        </RouterLink>
      </div>

      <!-- Bottom -->
      <div class="d-flex flex-column align-center pb-4 mt-auto">
        <v-btn icon color="white" @click="showUpdateProfile = true" class="mt-4">
          <v-icon>mdi-account-edit</v-icon>
        </v-btn>
        <v-btn icon color="white" @click="showChangePassword = true" class="mt-4">
          <v-icon>mdi-lock-reset</v-icon>
        </v-btn>
        <v-btn icon color="white" @click="handleLogout" class="mt-4">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </div>
    </v-navigation-drawer>

    <!-- Dynamic Content from Views -->
    <v-main>
      <RouterView />
    </v-main>

    <!-- Global Modals -->
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

const router = useRouter()
const showChangePassword = ref(false)
const showUpdateProfile = ref(false)
const user = ref(null)

onMounted(() => {
  user.value = authHandler.getDecodedToken()
})

const onProfileUpdated = () => {
  user.value = authHandler.getDecodedToken()
}

const handleLogout = () => {
  authHandler.logout()
  router.push('/log-in')
}
</script>
