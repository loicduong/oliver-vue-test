<template>
  <div class="language-switcher">
    <button :class="{ active: currentLocale === 'en' }" @click="switchLocale('en')">English</button>
    <button :class="{ active: currentLocale === 'ur' }" @click="switchLocale('ur')">اردو</button>
  </div>
</template>

<script setup>
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
.language-switcher {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 1000;
}

button {
  margin: 0 4px;
  padding: 4px 12px;
  border: 1px solid #ccc;
  background: #fff;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
  transition: all 0.2s ease;
}

button:hover {
  background: #f5f5f5;
}

button.active {
  background: #1976d2;
  color: #fff;
  border-color: #1976d2;
}

button.active:hover {
  background: #1565c0;
}
</style> 