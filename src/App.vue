<template>
  <v-app>
    <LanguageSwitcher />
    
    <!-- Auth routes without DefaultLayout -->
    <template v-if="isAuthRoute">
      <RouterView />
    </template>
    
    <!-- Non-auth routes with DefaultLayout -->
    <template v-else>
      <DefaultLayout />
    </template>
  </v-app>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const route = useRoute()

// Define auth routes that should not use DefaultLayout
const authRoutes = [
  '/',
  '/log-in',
  '/sign-up',
  '/lost-password',
  '/reset-password',
  '/confirm-email',
  '/verify',
  '/404'
]

// Check if current route is an auth route
const isAuthRoute = computed(() => {
  return authRoutes.includes(route.path)
})
</script>
