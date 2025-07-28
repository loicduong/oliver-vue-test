<template>
  <div class="grid items-center px-4 py-3 bg-white shadow-sm rounded" :style="rowStyle">
    <div>#V001</div>
    <div>Vendor Corp</div>
    <div>2024-01-22</div>
    <div>$3,750.00</div>
    <div><span class="text-red-600">Cancelled</span></div>
  </div>
</template>

<script setup lang="ts">
const rowStyle = {
  display: 'grid',
  gridTemplateColumns: '150px 1fr 120px 100px 120px',
  columnGap: '16px',
}
</script>
