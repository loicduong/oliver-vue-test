<template>
  <div class="grid items-center px-4 py-3 bg-white shadow-sm rounded" :style="rowStyle">
    <div>#F001</div>
    <div>Fan Club</div>
    <div>2024-01-18</div>
    <div>$150.00</div>
    <div><span class="text-blue-600">Processing</span></div>
  </div>
</template>

<script setup lang="ts">
const rowStyle = {
  display: 'grid',
  gridTemplateColumns: '150px 1fr 120px 100px 120px',
  columnGap: '16px',
}
</script>
