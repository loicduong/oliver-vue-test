<template>
  <div class="grid items-center px-4 py-3 bg-white shadow-sm rounded" :style="rowStyle">
    <div class="font-medium text-orange-600">#10237</div>
    <div class="flex items-center">
      <div class="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
        <span class="text-orange-600 font-medium text-sm">RB</span>
      </div>
      <div>
        <div class="font-medium">Robert Brown</div>
        <div class="text-sm text-gray-500">robert.brown@email.com</div>
      </div>
    </div>
    <div class="text-gray-600">2025-01-24</div>
    <div class="font-medium">$450.00</div>
    <div>
      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
        Cancelled
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
