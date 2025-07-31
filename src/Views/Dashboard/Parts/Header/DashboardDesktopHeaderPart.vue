<template>
  <div class="flex items-center justify-between">
    <div class="flex items-center space-x-4">
      <h1 class="text-xl font-semibold text-gray-900">Home</h1>
    </div>
    <nav class="flex space-x-4">
      <RouterLink to="/dashboard/order" class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Orders</RouterLink>
      <RouterLink to="/dashboard/order" class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Products</RouterLink>
      <RouterLink to="/dashboard/order" class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Customers</RouterLink>
      <RouterLink to="/dashboard/order" class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Analytics</RouterLink>
    </nav>
    <div class="flex items-center space-x-4">
      <v-menu>
        <template #activator="{ props }">
          <v-btn v-bind="props" icon>
            <v-avatar size="32">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=32&h=32&q=80" alt="User avatar">
            </v-avatar>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="handleLogout">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { authHandler } from '@/services/authHandler'

const router = useRouter()

function handleLogout() {
  authHandler.logout()
  router.push('/log-in')
}
</script>
