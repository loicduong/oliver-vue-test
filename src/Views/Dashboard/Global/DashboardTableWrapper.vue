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

<script setup lang="ts">
import { computed } from 'vue'
import type { TableConfig } from '@/types'

interface Props {
  config: TableConfig
}

const props = defineProps<Props>()

// Computed style for headers and rows
const headerGridStyle = computed((): Record<string, string> => ({
  display: 'grid',
  gridTemplateColumns: props.config.columns.map(col => col.width).join(' '),
  columnGap: props.config.colGap || '1rem',
}))

const rowGridStyle = computed((): Record<string, string> => ({
  display: 'grid',
  rowGap: props.config.rowGap || '1rem',
}))
</script>
