import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'

// Vuetify setup
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
  theme: {
    defaultTheme: 'light',
  }
})

import { authHandler } from './services/authHandler'

authHandler.restoreSession().then(() => {
  console.log('✅ Session restored');
}).catch(() => {
  console.log('🔐 No valid session found');
});

const app = createApp(App)

app.use(vuetify)
app.use(router)
app.use(i18n)

app.mount('#app')
