/**
 * vite.config.ts
 *
 * Vite build and dev-server configuration for the portfolio: React plugin,
 * dependency pre-bundling tweaks and the dev-server bind address.
 */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Bind to IPv4 explicitly: the default `localhost` resolves to ::1 only on this
  // machine, which Chrome falls back to but Firefox/Edge do not.
  server: {
    host: '127.0.0.1',
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
