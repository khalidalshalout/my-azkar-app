import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // حافظنا على التيلوند عشان التصميم ما يخرب
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: 'أذكار المسلم - خالد',
        short_name: 'أذكاري',
        description: 'تطبيق أذكار يومي بسيط وأنيق',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone', // السر في الأناقة هنا (بدون شريط متصفح)
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})