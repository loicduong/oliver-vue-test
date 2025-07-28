<script setup lang="ts">
// Import template
import DashboardOrdersMainTemplate from '@/Views/Dashboard/Parts/Orders/DashboardOrdersMainTemplate.vue'

// Import table wrapper
import DashboardTableWrapper from '@/Views/Dashboard/Global/DashboardTableWrapper.vue'

// Import different role table items
import CreatorTableItem from '@/Views/Dashboard/Parts/Orders/Creator/DashboardTableItemPart.vue'
import FanTableItem from '@/Views/Dashboard/Parts/Orders/Fan/DashboardTableItemPart.vue'
import AgentTableItem from '@/Views/Dashboard/Parts/Orders/Agent/DashboardTableItemPart.vue'
import VendorTableItem from '@/Views/Dashboard/Parts/Orders/Vendor/DashboardTableItemPart.vue'

import type { TableConfig } from '@/types'

// Example: Different table configs for different use cases
const ordersTableConfig: TableConfig = {
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

const productsTableConfig: TableConfig = {
  headers: true,
  fixedHeaderWithScrollableBody: false,
  responsiveHorizontalScroll: true,
  columns: [
    { title: 'Product ID', width: '120px' },
    { title: 'Name', width: '1fr' },
    { title: 'Category', width: '150px' },
    { title: 'Price', width: '100px' },
    { title: 'Stock', width: '80px' },
  ],
  rowGap: '8px',
  colGap: '12px',
  mobileBreakPoint: '768px',
}
</script>

<template>
  <div>
    <!-- Example 1: Using the main template -->
    <DashboardOrdersMainTemplate />

    <!-- Example 2: Custom table with different config -->
    <div class="mt-8 p-6 bg-white rounded-lg shadow">
      <h2 class="text-xl font-bold mb-4">Products Table Example</h2>
      <DashboardTableWrapper :config="productsTableConfig">
        <div class="grid items-center px-4 py-3 bg-gray-50 shadow-sm rounded" :style="{ display: 'grid', gridTemplateColumns: '120px 1fr 150px 100px 80px', columnGap: '12px' }">
          <div class="font-medium text-blue-600">#P001</div>
          <div class="font-medium">iPhone 15 Pro</div>
          <div class="text-gray-600">Electronics</div>
          <div class="font-medium">$999.00</div>
          <div class="text-green-600 font-medium">45</div>
        </div>
        <div class="grid items-center px-4 py-3 bg-white shadow-sm rounded" :style="{ display: 'grid', gridTemplateColumns: '120px 1fr 150px 100px 80px', columnGap: '12px' }">
          <div class="font-medium text-blue-600">#P002</div>
          <div class="font-medium">MacBook Air</div>
          <div class="text-gray-600">Computers</div>
          <div class="font-medium">$1,199.00</div>
          <div class="text-green-600 font-medium">12</div>
        </div>
      </DashboardTableWrapper>
    </div>

    <!-- Example 3: Role-based table items -->
    <div class="mt-8 p-6 bg-white rounded-lg shadow">
      <h2 class="text-xl font-bold mb-4">Role-based Orders</h2>
      <DashboardTableWrapper :config="ordersTableConfig">
        <CreatorTableItem />
        <FanTableItem />
        <AgentTableItem />
        <VendorTableItem />
      </DashboardTableWrapper>
    </div>
  </div>
</template>
