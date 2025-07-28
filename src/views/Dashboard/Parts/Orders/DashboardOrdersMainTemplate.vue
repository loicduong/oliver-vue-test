<script setup>
// Global layout wrappers
import DashboardMainWrapperDesktop from '@/views/Dashboard/Global/DashboardMainWrapperDesktop.vue'
import DashboardBaseContainerWrapper from '@/views/Dashboard/Global/DashboardBaseContainerWrapper.vue'
import DashboardTwoColContainerWrapper from '@/views/Dashboard/Global/DashboardTwoColContainerWrapper.vue'
import DashboardTwoColInnerContainerWrapper from '@/views/Dashboard/Global/DashboardTwoColInnerContainerWrapper.vue'
import DashboardDesktopHeaderContainerWrapper from '@/views/Dashboard/Global/DashboardDesktopHeaderContainerWrapper.vue'

// Header parts
import DashboardMobileHeaderPart from '@/views/Dashboard/Parts/Header/DashboardMobileHeaderPart.vue'
import DashboardDesktopHeaderPart from '@/views/Dashboard/Parts/Header/DashboardDesktopHeaderPart.vue'

// Title and actions
import DashboardTitle from '@/views/Dashboard/Global/DashboardTitle.vue'
import DashboardUpdateButtons from '@/views/Dashboard/Global/DashboardUpdateButtons.vue'

// Table wrapper (enabled via config)
import DashboardTableWrapper from '@/views/Dashboard/Global/DashboardTableWrapper.vue'

// Role-specific rows (example for "Creator")
import DashboardTableItemPart from '@/views/Dashboard/Parts/Orders/Creator/DashboardTableItemPart.vue'

// Table config object
const tableConfig = {
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
            <DashboardTableItemPart />
            <DashboardTableItemPart />
            <DashboardTableItemPart />
          </DashboardTableWrapper>
        </DashboardTwoColInnerContainerWrapper>
      </DashboardTwoColContainerWrapper>
    </DashboardBaseContainerWrapper>
  </DashboardMainWrapperDesktop>
</template>
