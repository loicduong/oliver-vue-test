<template>
  <div>
    <button :class="{ active: currentLocale === 'en' }" @click="switchLocale('en')">English</button>
    <button :class="{ active: currentLocale === 'ur' }" @click="switchLocale('ur')">اردو</button>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck

import { ref, watch } from 'vue'
import i18n from '@/i18n'

const currentLocale = ref(i18n.global.locale.value)

function switchLocale(locale) {
  i18n.global.locale.value = locale
  currentLocale.value = locale
  if (!window.userData) window.userData = {}
  window.userData.currentPageLocale = locale
}

// Keep in sync if changed elsewhere
watch(() => i18n.global.locale.value, (val) => {
  currentLocale.value = val
})
</script>

<style scoped>
button {
  margin: 0 4px;
  padding: 4px 12px;
  border: 1px solid #ccc;
  background: #fff;
  cursor: pointer;
}
button.active {
  background: #1976d2;
  color: #fff;
  border-color: #1976d2;
}
</style>
