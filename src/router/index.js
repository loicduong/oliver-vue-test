import { createRouter, createWebHistory } from 'vue-router';
import routeConfig from './routeConfig.json';
import routeGuard from './routeGuard';

// Use import.meta.glob to pre-load all components
const componentModules = import.meta.glob('@/components/**/*.vue', { eager: false });

// Debug: Log all available components
console.log('[ROUTER] Available components:', Object.keys(componentModules));

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
        // Convert the path from @/components/... to /src/components/...
        const normalizedPath = finalPath.replace('@', '/src');
        
        if (componentModules[normalizedPath]) {
          return componentModules[normalizedPath]();
        } else {
          console.warn(`[ROUTER] Component not found: ${finalPath}`);
          return import('@/components/NotFound.vue');
        }
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