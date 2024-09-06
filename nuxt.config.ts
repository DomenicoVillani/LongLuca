import { resolve } from 'path';
import { pathToFileURL } from 'url';

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['nuxt-primevue'],
  runtimeConfig: {
    public: {
      dbPath: process.env.DB_PATH 
        ? pathToFileURL(resolve(process.env.DB_PATH)).href
        : pathToFileURL(resolve('db/db.json')).href,
    },
  },
  build: {
    transpile: ['lowdb'],
  },
  primevue: {
    options: { ripple: true },
    components: {
      exclude: ['Editor'],
    },
    directives: {
      include: ['Tooltip', 'Badge', 'Ripple'],
    },
  },
  css: [
    'primeicons/primeicons.css',
    'primeflex/primeflex.scss',
    'primevue/resources/themes/lara-dark-purple/theme.css'
  ],
  ssr: false,
});
