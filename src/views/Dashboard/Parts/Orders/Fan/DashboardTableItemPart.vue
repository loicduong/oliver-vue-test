<template>
  <div class="grid items-center px-4 py-3 bg-white shadow-sm rounded" :style="rowStyle">
    <div class="font-medium text-purple-600">#10235</div>
    <div class="flex items-center">
      <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
        <span class="text-purple-600 font-medium text-sm">MS</span>
      </div>
      <div>
        <div class="font-medium">Mike Smith</div>
        <div class="text-sm text-gray-500">mike.smith@email.com</div>
      </div>
    </div>
    <div class="text-gray-600">2025-01-26</div>
    <div class="font-medium">$89.99</div>
    <div>
      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
        Pending
      </span>
    </div>
  </div>
</template>

<script setup>
const rowStyle = {
  display: 'grid',
  gridTemplateColumns: '150px 1fr 120px 100px 120px',
  columnGap: '16px',
}
</script>
