import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../Views/Dashboard/Parts/Orders/DashboardOrdersMainTemplate.vue'),
    },
    {
      path: '/orders',
      name: 'orders',
      component: () => import('../Views/OrdersMain.vue'),
    },
  ],
})

export default router
