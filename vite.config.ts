import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import mkcert from 'vite-plugin-mkcert';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  plugins: [
    react(), 
    mkcert(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "emastats",
        short_name: "emastats",
        start_url: "/RIP_2025_frontend/", // Добавляем base URL
        display: "standalone",
        background_color: "#fdfdfd",
        theme_color: "#db4938",
        orientation: "portrait-primary",
        scope: "/RIP_2025_frontend/", // Добавляем scope
        icons: [
          {
            "src": "/RIP_2025_frontend/12months.png", // Полный путь к иконкам
            "type": "image/png", 
            "sizes": "192x192"
          },
          {
            "src": "/RIP_2025_frontend/12months.png",
            "type": "image/png", 
            "sizes": "512x512"
          }
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        navigateFallback: '/RIP_2025_frontend/index.html', // Fallback для SPA
      }
    })
  ],
  base: "/RIP_2025_frontend",
  server: {
    port: 3000,
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'cert.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'cert.crt')),
    },
    proxy: {
      "/api": {
        target: "http://localhost:8081",
        changeOrigin: true,
      },
    },
  },
});