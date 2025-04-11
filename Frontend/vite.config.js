// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.multiavatar.com',  // Target the MultiAvatar API
        changeOrigin: true,                      // Change the origin of the request
        rewrite: (path) => path.replace(/^\/api/, ''), // Rewrite URL to match API endpoint
      },
    },
  },
});
