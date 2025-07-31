<template>
  <div class="bg-white shadow-sm border-b border-gray-200 p-4">
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <button class="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        <h1 class="ml-4 text-lg font-semibold text-gray-900">{{ getText('dashboard.navigation.overview') }}</h1>
      </div>
      <div class="flex items-center space-x-2">
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
              <v-list-item-title>{{ getText('dashboard.navigation.logout') }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { authHandler } from '@/services/authHandler'
import { getText } from '@/i18n/TranslationHandler'

const router = useRouter()

function handleLogout() {
  authHandler.logout()
  router.push('/log-in')
}
</script>
