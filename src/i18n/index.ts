// @ts-nocheck

import { createI18n } from 'vue-i18n';

const messages = {};

function loadLocaleMessages() {
  const locales = import.meta.glob('./**/*.json', { eager: true });
  Object.keys(locales).forEach(key => {
    const match = key.match(/\.\/([A-Za-z0-9-_]+)\/([A-Za-z0-9-_]+)\/(.*)\.json$/);
    if (!match) return;
    const category = match[1];
    const locale = match[2];
    const name = match[3];

    if (!messages[locale]) messages[locale] = {};
    if (!messages[locale][category]) messages[locale][category] = {};

    messages[locale][category][name] = locales[key].default;
  });
}

loadLocaleMessages();

const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages,
});

export default i18n;
