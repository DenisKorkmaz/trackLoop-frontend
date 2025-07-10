// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
import {VitePWA} from "vite-plugin-pwa";


export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],
  modules: [
    '@vite-pwa/nuxt',
    '@nuxt/ui',
    '@nuxt/icon',
    '@nuxt/test-utils',
    '@nuxt/image',
    '@nuxt/fonts'  ],
  vite: {
    plugins: [tailwindcss()]
  },
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Meine App',
      short_name: 'App',
      theme_color: '#ffffff',
      display: 'standalone',
      start_url: '/'
    }
  },
  typescript: { strict: true }
})