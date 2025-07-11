// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
    compatibilityDate: '2025-05-15',
    devtools: {enabled: true},

    css: ['~/assets/css/main.css'],
    modules: [
        '@vite-pwa/nuxt',
        '@nuxt/ui',
        '@nuxt/icon',
        '@nuxt/test-utils',
        '@nuxt/image',
        '@nuxt/fonts',
        'nuxt-auth-sanctum'
    ],
    sanctum: {
        baseUrl: 'http://localhost:8000',
        endpoints: {
            login: '/api/login',
            logout: '/api/logout',
            user: '/api/user',
            csrf: '/sanctum/csrf-cookie'
        },
        redirect: {
            onLogin: '/',
            onLogout: '/login',
        }
    },
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
    runtimeConfig: {
        public: {
            baseUrl: 'http://localhost:8000',
        }
    },
    typescript: {strict: true}
})