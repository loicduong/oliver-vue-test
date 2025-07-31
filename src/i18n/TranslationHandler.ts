// @ts-nocheck

import i18n from '@/i18n';
import { useRoute } from 'vue-router';
import { appRoutes } from '@/config/routes';
import { supportedLocales, defaultLocale } from '@/config/locales';

const loadedFilesCache = new Set();
let cachedLocale = null;

function resolveLocale() {
    const pageLocale = window?.userData?.currentPageLocale;
    const globalLocale = window?.userData?.globalLocale;
    const urlLocale = extractLocaleFromUrl();

    if (isValidLocale(pageLocale)) return pageLocale;
    if (isValidLocale(globalLocale)) return globalLocale;
    if (isValidLocale(urlLocale)) return urlLocale;

    return defaultLocale;
}

function extractLocaleFromUrl() {
    const path = window.location.pathname.split('/').filter(Boolean);
    return path[0];
}

function isValidLocale(locale) {
    return supportedLocales.some(l => l.code === locale);
}

function getCurrentLocale() {
    if (!cachedLocale) cachedLocale = resolveLocale();
    return cachedLocale;
}

export function flushTranslations() {
    loadedFilesCache.clear();
    cachedLocale = null;

    if (window?.userData) {
        window.userData.currentPageLocale = null;
        window.userData.globalLocale = null;
    }
}

async function loadTranslationFile(filePath, locale) {
    const cacheKey = `${locale}:${filePath}`;
    if (loadedFilesCache.has(cacheKey)) return;

    try {
        const messages = await import(
            /* @vite-ignore */ `../i18n/${filePath}/${locale}.json`
        );

        i18n.global.setLocaleMessage(locale, {
            ...i18n.global.getLocaleMessage(locale),
            ...messages.default
        });

        loadedFilesCache.add(cacheKey);
    } catch {
        console.warn(`Missing translation: ${filePath}/${locale}.json`);
        if (locale !== 'en') {
            await loadTranslationFile(filePath, 'en');
        }
    }
}

export async function initTranslationHandler(to) {
const userRole  = window?.userData?.currentRole
  const locale    = getCurrentLocale()
  const routePath = to.path

  const matchedRoute = appRoutes.find(r => r.path === routePath)
  if (!matchedRoute) return

  const roleConfig = matchedRoute.roles?.[userRole]
  if (!roleConfig) return

  const segments    = routePath.split('/').filter(Boolean)
  const parentFiles = segments.map((_, i) =>
    segments.slice(0, i + 1).join('/')
  )
  const roleFiles = roleConfig.translations || []
  const allFiles  = Array.from(new Set([...parentFiles, ...roleFiles]))

  // Parallel load all needed JSON files
  await Promise.all(
    allFiles.map(fp => loadTranslationFile(fp, locale))
  )
}

export function getText(key) {
  const route    = useRoute()
  const userRole = window?.userData?.currentRole || 'guest'

  const matchedRoute = appRoutes.find(r => r.path === route.path)
  const roleConfig   = matchedRoute?.roles?.[userRole]
  const pageKey      = roleConfig?.pageKey

  console.log(userRole, matchedRoute, key, pageKey);
  if (!pageKey) return ''

  const locale   = getCurrentLocale()
  const fullKey  = `${pageKey}.${key}`
  console.log('fullKey', fullKey)
  const result   = i18n.global.t(fullKey, locale)
  return result === fullKey ? '' : result
}
