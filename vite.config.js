import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/',
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        // Avoid precaching every frame in the scroll sequence during first visit.
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,avif}'],
        runtimeCaching: [{
          urlPattern: /\/assets\/frames\/frame_\d+\.jpg$/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'daiyas-campaign-frames',
            expiration: { maxEntries: 12, maxAgeSeconds: 60 * 60 * 24 * 30 },
            cacheableResponse: { statuses: [0, 200] }
          }
        }]
      },
      includeAssets: ['assets/logos/Daiyas Logo.png'],
      manifest: {
        name: "Daiya’s | Mustard Oil & Trade Enquiries",
        short_name: "Daiya’s",
        description: "Discover Daiya’s mustard oil range and enquire about retailer, wholesale and distribution opportunities.",
        theme_color: '#203c2c',
        background_color: '#f8f4e8',
        display: 'standalone',
        icons: [{
          src: 'assets/logos/Daiyas Logo.png',
          sizes: 'any',
          type: 'image/png'
        }]
      }
    })
  ]
});
