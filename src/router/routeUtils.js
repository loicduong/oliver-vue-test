import { authHandler } from '@/services/authHandler';
import { jwtDecode } from 'jwt-decode';
import routeConfig from './routeConfig.json';

function getDecodedToken() {
    const token = authHandler.getIdToken?.();
    if (!token) return null;

    try {
        return jwtDecode(token);
    } catch {
        return null;
    }
}

export function isUserLoggedIn() {
    return !!authHandler.getIdToken?.();
}

export function getUserRole() {
    const decoded = getDecodedToken();
    return decoded?.['custom:role'] || null;
}

export function getUserState() {
    const decoded = getDecodedToken();
    return {
        kycPassed: decoded?.['custom:kycPassed'] === 'true',
        onboardingPassed: decoded?.['custom:onboardingPassed'] === 'true',
        awsDataCheck: decoded?.['custom:awsDataCheck'] === 'true'
    };
}

export function matchRole(allowedRoles, currentRole) {
    return (
        allowedRoles.includes('any') ||
        allowedRoles.includes(currentRole) ||
        allowedRoles.includes('all')
    );
}

export function getRouteBySlug(path) {
    return routeConfig.find(route =>
        route.slug === path ||
        (route.dynamicRoute && route.slug.includes(':') && path.match(new RegExp(route.slug.replace(/:[^/]+/g, '[^/]+'))))
    );
}