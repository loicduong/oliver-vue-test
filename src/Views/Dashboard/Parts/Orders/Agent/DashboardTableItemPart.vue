<template>
  <div class="grid items-center px-4 py-3 bg-white shadow-sm rounded" :style="rowStyle">
    <div>#A001</div>
    <div>Agent Smith</div>
    <div>2024-01-15</div>
    <div>$1,250.00</div>
    <div><span class="text-green-600">Completed</span></div>
  </div>
</template>

<script setup lang="ts">
const rowStyle = {
  display: 'grid',
  gridTemplateColumns: '150px 1fr 120px 100px 120px',
  columnGap: '16px',
}
</script>
