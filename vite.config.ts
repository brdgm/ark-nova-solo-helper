import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import path from 'path'
import { description, appDeployName } from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
  base: `/${appDeployName}/`,
  plugins: [
    vue(),
    VitePWA({
      registerType: 'prompt',
      manifestFilename: 'manifest.json',
      filename: 'service-worker.js',
      // cache all asset imports
      workbox: {
        globPatterns: ["**/*"]
      },
      // include all static assets
      includeAssets: [
        "**/*.ico",
        "**/*.svg",
        "**/*.png",
        "**/*.jpg",
        "**/*.webp"
      ],
      manifest: {
        name: description,
        short_name: description,
        description: description,
        theme_color: '#333',
        background_color: '#000',
        icons: [
          {
            src: 'img/icons/pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png'
          },
          {
            src: 'img/icons/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'img/icons/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    }),
    VueI18nPlugin({
      include: [path.resolve(__dirname, './src/locales/**')],
      strictMessage: false
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 8080
  },
  preview: {
    port: 8081
  }
})
