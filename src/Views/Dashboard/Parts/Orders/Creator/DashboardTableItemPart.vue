<template>
  <div class="grid items-center px-4 py-3 bg-white shadow-sm rounded" :style="rowStyle">
    <div>#C001</div>
    <div>Creator Studio</div>
    <div>2024-01-20</div>
    <div>$2,500.00</div>
    <div><span class="text-yellow-600">{{ getText('dashboard.messages.profileUpdated') }}</span></div>
  </div>
</template>

<script setup lang="ts">
import { getText } from '@/i18n/TranslationHandler'

const rowStyle = {
  display: 'grid',
  gridTemplateColumns: '150px 1fr 120px 100px 120px',
  columnGap: '16px',
}
</script>
