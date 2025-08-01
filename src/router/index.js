import { createRouter, createWebHistory } from 'vue-router';
import routeConfig from './routeConfig.json';
import routeGuard from './routeGuard';

const routes = routeConfig.map(route => {
  if (route.redirect) {
    return { path: route.slug, redirect: route.redirect };
  }

  return {
    path: route.slug,
    component: async () => {
      const role = localStorage.getItem('userRole');
      const overridePath = route.customComponentPath?.[role]?.componentPath;
      const fallbackPath = route.componentPath;
      const finalPath = overridePath || fallbackPath;

      if (!finalPath) {
        return import('@/components/NotFound.vue');
      }

      try {
        const moduleKey = finalPath.replace('@', '/src');

        return await import(/* @vite-ignore */ moduleKey);
      } catch (err) {
        console.warn(`[ROUTER] Failed to load: ${finalPath}`, err);
        return import('@/components/NotFound.vue');
      }
    },
    meta: {
      requiresAuth: route.requiresAuth,
      supportedRoles: route.supportedRoles || [],
      dependencies: route.dependencies || {},
      redirectIfNotAuth: route.redirectIfNotAuth,
      redirectIfLoggedIn: route.redirectIfLoggedIn,
      inheritConfigFromParent: route.inheritConfigFromParent || false,
      dynamicRoute: route.dynamicRoute || false
    }
  };
});

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(routeGuard);

export default router;