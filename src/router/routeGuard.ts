// @ts-nocheck

import {
  isUserLoggedIn,
  getUserRole,
  getUserState,
  matchRole,
  getRouteBySlug
} from './routeUtils';
import routeConfig from './routeConfig.json';

export default function routeGuard(to, from, next) {
  const matchedRoute = getRouteBySlug(to.path);
  if (!matchedRoute) return next('/404');

  const isLoggedIn = isUserLoggedIn();
  const userRole = getUserRole();
  const userState = getUserState();

  // 🔁 Redirect if already logged in
  if (matchedRoute.redirectIfLoggedIn && isLoggedIn) {
    return next(matchedRoute.redirectIfLoggedIn);
  }

  // 🔐 Require auth
  if (matchedRoute.requiresAuth && !isLoggedIn) {
    return next(matchedRoute.redirectIfNotAuth || '/log-in');
  }

  // 👤 Role check
  if (
    matchedRoute.supportedRoles.length > 0 &&
    !matchRole(matchedRoute.supportedRoles, userRole)
  ) {
    return next('/dashboard');
  }

  // 🧠 Dependency check
  const parentDeps = getParentRouteDeps(to.path);
  const allDeps = [...parentDeps, matchedRoute].filter(r => r);

  for (const route of allDeps) {
    const deps = route.dependencies || {};
    const roleDeps = deps.roles?.[userRole];

    if (roleDeps) {
      for (const [key, val] of Object.entries(roleDeps)) {
        if (val?.required && !userState[key]) {
          return next(val.fallbackSlug || '/404');
        }
      }
    }

    for (const [key, val] of Object.entries(deps)) {
      if (key === 'roles') continue;
      if (val?.required && !userState[key]) {
        return next(val.fallbackSlug || '/404');
      }
    }
  }

  next();
}

function getParentRouteDeps(path) {
  const segments = path.split('/');
  const parents = [];

  while (segments.length > 1) {
    segments.pop();
    const parentPath = segments.join('/') || '/';
    const parent = getRouteBySlug(parentPath);
    if (parent?.inheritConfigFromParent) {
      parents.push(parent);
    }
  }

  return parents.reverse(); // prioritize outermost first
}
