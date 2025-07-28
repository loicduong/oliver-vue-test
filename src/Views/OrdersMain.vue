<script setup lang="ts">
// Import table wrapper
import DashboardTableWrapper from '@/Views/Dashboard/Global/DashboardTableWrapper.vue'

// Import different role table items
import CreatorTableItem from '@/Views/Dashboard/Parts/Orders/Creator/DashboardTableItemPart.vue'
import FanTableItem from '@/Views/Dashboard/Parts/Orders/Fan/DashboardTableItemPart.vue'
import AgentTableItem from '@/Views/Dashboard/Parts/Orders/Agent/DashboardTableItemPart.vue'
import VendorTableItem from '@/Views/Dashboard/Parts/Orders/Vendor/DashboardTableItemPart.vue'

import type { TableConfig } from '@/types'

const tableConfig: TableConfig = {
  headers: true,
  fixedHeaderWithScrollableBody: true,
  responsiveHorizontalScroll: true,
  columns: [
    { title: 'Order ID', width: '150px' },
    { title: 'Customer', width: '1fr' },
    { title: 'Date', width: '120px' },
    { title: 'Amount', width: '100px' },
    { title: 'Status', width: '120px' },
  ],
  rowGap: '12px',
  colGap: '16px',
  mobileBreakPoint: '768px',
}
</script>

<template>
  <DashboardTableWrapper :config="tableConfig">
    <CreatorTableItem />
    <FanTableItem />
    <AgentTableItem />
    <VendorTableItem />
  </DashboardTableWrapper>
</template>
