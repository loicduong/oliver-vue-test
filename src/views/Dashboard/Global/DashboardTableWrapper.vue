<template>
  <div
    class="w-full"
    :class="{ 'overflow-x-auto': config.responsiveHorizontalScroll }"
  >
    <!-- Optional fixed header -->
    <div
      v-if="config.headers"
      class="grid bg-gray-100 font-bold text-sm py-2 px-4 sticky top-0 z-10"
      :style="headerGridStyle"
    >
      <div
        v-for="(col, index) in config.columns"
        :key="'header-' + index"
        class="truncate"
      >
        {{ col.title }}
      </div>
    </div>

    <!-- Table content (rows) -->
    <div
      class="grid"
      :style="rowGridStyle"
    >
      <slot />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  config: {
    type: Object,
    required: true,
  }
})

// Computed style for headers and rows
const headerGridStyle = computed(() => ({
  display: 'grid',
  gridTemplateColumns: props.config.columns.map(col => col.width).join(' '),
  columnGap: props.config.colGap || '1rem',
}))

const rowGridStyle = computed(() => ({
  display: 'grid',
  rowGap: props.config.rowGap || '1rem',
}))
</script>
