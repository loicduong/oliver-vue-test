<script setup lang="ts">
// Global layout wrappers
import DashboardMainWrapperDesktop from '@/Views/Dashboard/Global/DashboardMainWrapperDesktop.vue'
import DashboardBaseContainerWrapper from '@/Views/Dashboard/Global/DashboardBaseContainerWrapper.vue'
import DashboardTwoColContainerWrapper from '@/Views/Dashboard/Global/DashboardTwoColContainerWrapper.vue'
import DashboardTwoColInnerContainerWrapper from '@/Views/Dashboard/Global/DashboardTwoColInnerContainerWrapper.vue'
import DashboardDesktopHeaderContainerWrapper from '@/Views/Dashboard/Global/DashboardDesktopHeaderContainerWrapper.vue'

// Header parts
import DashboardMobileHeaderPart from '@/Views/Dashboard/Parts/Header/DashboardMobileHeaderPart.vue'
import DashboardDesktopHeaderPart from '@/Views/Dashboard/Parts/Header/DashboardDesktopHeaderPart.vue'

// Title and actions
import DashboardTitle from '@/Views/Dashboard/Global/DashboardTitle.vue'
import DashboardUpdateButtons from '@/Views/Dashboard/Global/DashboardUpdateButtons.vue'

// Table wrapper (enabled via config)
import DashboardTableWrapper from '@/Views/Dashboard/Global/DashboardTableWrapper.vue'

// Role-specific rows (example for "Creator")
import CreatorTableItem from '@/Views/Dashboard/Parts/Orders/Creator/DashboardTableItemPart.vue'
import FanTableItem from '@/Views/Dashboard/Parts/Orders/Fan/DashboardTableItemPart.vue'
import AgentTableItem from '@/Views/Dashboard/Parts/Orders/Agent/DashboardTableItemPart.vue'
import VendorTableItem from '@/Views/Dashboard/Parts/Orders/Vendor/DashboardTableItemPart.vue'

// Table config
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
  <DashboardMainWrapperDesktop>
    <DashboardBaseContainerWrapper>
      <DashboardDesktopHeaderContainerWrapper>
        <div class="block md:hidden">
          <DashboardMobileHeaderPart />
        </div>
        <div class="hidden md:block">
          <DashboardDesktopHeaderPart />
        </div>

        <DashboardTitle>
          My Orders
        </DashboardTitle>

        <DashboardUpdateButtons />
      </DashboardDesktopHeaderContainerWrapper>

      <DashboardTwoColContainerWrapper>
        <DashboardTwoColInnerContainerWrapper>
          <DashboardTableWrapper :config="tableConfig">
            <!-- Example table items -->
            <CreatorTableItem />
            <FanTableItem />
            <AgentTableItem />
            <VendorTableItem />
          </DashboardTableWrapper>
        </DashboardTwoColInnerContainerWrapper>
      </DashboardTwoColContainerWrapper>
    </DashboardBaseContainerWrapper>
  </DashboardMainWrapperDesktop>
</template>
