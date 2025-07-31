// @ts-nocheck

import { createI18n } from 'vue-i18n';

const messages = {};

function loadLocaleMessages() {
    const locales = import.meta.glob('./**/*.json', { eager: true });
    Object.keys(locales).forEach(key => {
        const match = key.match(/\.\/([A-Za-z0-9-_]+)\/(.*)\.json$/);
        if (!match) return;
        const locale = match[1];
        const name = match[2].replace('.json', '');
        if (!messages[locale]) messages[locale] = {};
        // support nested merging
        if (name.includes('.')) {
            const keys = name.split('.');
            let target = messages[locale];
            keys.forEach((k, idx) => {
                if (idx === keys.length - 1) {
                    target[k] = locales[key].default;
                } else {
                    if (!target[k]) target[k] = {};
                    target = target[k];
                }
            });
        } else {
            messages[locale][name] = locales[key].default;
        }
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
