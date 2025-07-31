<script setup lang="ts">
import { RouterView } from 'vue-router'
import LanguageSwitcher from '@/Views/Components/UI/LanguageSwitcher.vue'
</script>

<template>
  <v-app>
    <div class="flex justify-center items-center py-4">
      <LanguageSwitcher />
    </div>
    <RouterView />
  </v-app>
</template>

<style scoped>
</style>
