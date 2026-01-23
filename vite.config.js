import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    base: './',
    plugins: [
        VitePWA({
            registerType: 'autoUpdate',
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg}']
            },
            includeAssets: ['assets/logos/Daiyas Logo.png'],
            manifest: {
                name: "Daiya's Jagdish Brand",
                short_name: "Daiya's",
                description: "Premium Wood-Pressed Cold Pressed Oils",
                theme_color: '#0B0D0A',
                background_color: '#0B0D0A',
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
})
