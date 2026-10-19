import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/',
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,webp,avif}']
      },
      includeAssets: ['assets/logos/Daiyas Logo.png'],
      manifest: {
        name: "Daiya’s | Mustard Oil & Trade Enquiries",
        short_name: "Daiya’s",
        description: "Discover Daiya’s mustard oil range and enquire about retailer, wholesale and distribution opportunities.",
        theme_color: '#203c2c',
        background_color: '#f8f4e8',
        display: 'standalone',
        icons: [
          {
            src: 'assets/logos/Daiyas Logo.png',
            sizes: 'any',
            type: 'image/png'
          }
        ]
      }
    })
  ]
});
