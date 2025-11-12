import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { api_proxy_addr, img_proxy_addr, dest_root } from './target_config';


export default defineConfig({
  plugins: [
    react(), 
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "emastats",
        short_name: "emastats",
        start_url: "/", // Убираем base URL
        display: "standalone",
        background_color: "#fdfdfd",
        theme_color: "#db4938",
        orientation: "portrait-primary",
        scope: "/", // Убираем scope
        icons: [
          {
            "src": "/12months.png", // Убираем base путь
            "type": "image/png", 
            "sizes": "192x192"
          },
          {
            "src": "/12months.png",
            "type": "image/png", 
            "sizes": "512x512"
          }
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        navigateFallback: '/index.html', // Убираем base путь
      }
    })
  ],
  base: dest_root, 
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: api_proxy_addr,
        changeOrigin: true,
      },
      "/img-proxy": {
        target: img_proxy_addr,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/img-proxy/, "/periods"),
      },
    },
  },
});