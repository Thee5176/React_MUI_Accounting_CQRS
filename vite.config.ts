import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  build: {
    sourcemap: true, // Enable source maps for production
  },
  preview: {
    host: '0.0.0.0',
    port: 5000,
  }
})
