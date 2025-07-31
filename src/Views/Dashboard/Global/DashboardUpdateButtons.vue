<template>
  <div class="flex gap-3">
    <button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
      {{ getText('dashboard.actions.editProfile') }}
    </button>
    <button class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
      {{ getText('dashboard.actions.changePassword') }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { getText } from '@/i18n/TranslationHandler'
// Dashboard update buttons component
</script>
