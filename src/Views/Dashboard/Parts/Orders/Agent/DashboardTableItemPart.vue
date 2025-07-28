<template>
  <div class="grid items-center px-4 py-3 bg-white shadow-sm rounded" :style="rowStyle">
    <div class="font-medium text-green-600">#10236</div>
    <div class="flex items-center">
      <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
        <span class="text-green-600 font-medium text-sm">AL</span>
      </div>
      <div>
        <div class="font-medium">Alice Johnson</div>
        <div class="text-sm text-gray-500">alice.johnson@email.com</div>
      </div>
    </div>
    <div class="text-gray-600">2025-01-25</div>
    <div class="font-medium">$299.99</div>
    <div>
      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
        Shipped
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
