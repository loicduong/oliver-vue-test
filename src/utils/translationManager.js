import i18n from '@/i18n'
import { useRoute } from 'vue-router'
import { appRoutes } from '@/config/appRoutes'
import { supportedLocales, defaultLocale } from '@/config/locales'

// Pre-generate a map of all JSON translation files
const translationModules = import.meta.glob('../i18n/**/*.json')

// Caches for finished loads and in-flight promises
const loadedFilesCache = new Set()
const loadPromiseCache  = new Map()
let cachedLocale        = null

function resolveLocale() {
  const pageLocale   = window?.userData?.currentPageLocale
  const globalLocale = window?.userData?.globalLocale
  const urlLocale    = window.location.pathname
    .split('/')
    .filter(Boolean)[0]

  if (supportedLocales.some(l => l.code === pageLocale))   return pageLocale
  if (supportedLocales.some(l => l.code === globalLocale)) return globalLocale
  if (supportedLocales.some(l => l.code === urlLocale))    return urlLocale

  return defaultLocale
}

function getCurrentLocale() {
  if (!cachedLocale) cachedLocale = resolveLocale()
  return cachedLocale
}

export function flushTranslations() {
  loadedFilesCache.clear()
  cachedLocale = null
  if (window?.userData) {
    window.userData.currentPageLocale = null
    window.userData.globalLocale     = null
  }
}

async function loadTranslationFile(filePath, locale) {
  const cacheKey = `${locale}:${filePath}`
  if (loadedFilesCache.has(cacheKey)) return
  if (loadPromiseCache.has(cacheKey)) return loadPromiseCache.get(cacheKey)

  const modulePath = `../i18n/${locale}/${filePath}.json`
  const loader     = translationModules[modulePath]
  if (!loader) {
    console.warn(`No translation file found: ${modulePath}`)
    return
  }

  const promise = loader()
    .then(mod => {
      i18n.global.setLocaleMessage(
        locale,
        { 
          ...i18n.global.getLocaleMessage(locale),
          ...mod.default 
        }
      )
      loadedFilesCache.add(cacheKey)
    })
    .catch(() => {
      console.warn(`Failed to load translation: ${modulePath}`)
    })
    .finally(() => {
      loadPromiseCache.delete(cacheKey)
    })

  loadPromiseCache.set(cacheKey, promise)
  return promise
}

/**
 * Call from your router guard as: await initTranslationHandler(to)
 */
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

/**
 * Use inside components: initTranslationHandler must have run first.
 */
export function getText(key) {
  const route    = useRoute()
  const userRole = window?.userData?.currentRole

  const matchedRoute = appRoutes.find(r => r.path === route.path)
  const roleConfig   = matchedRoute?.roles?.[userRole]
  const pageKey      = roleConfig?.pageKey
  if (!pageKey) return ''

  const locale   = getCurrentLocale()
  const fullKey  = `${pageKey}.${key}`
  const result   = i18n.global.t(fullKey, locale)
  return result === fullKey ? '' : result
} 