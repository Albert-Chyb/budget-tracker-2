/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@shadcn': path.resolve(__dirname, '@shadcn'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@lib': path.resolve(__dirname, 'src/lib'),
      '@contexts': path.resolve(__dirname, 'src/contexts'),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
    coverage: {
      include: ['src/**/*'],
      enabled: true,
      reporter: 'html',
    },
  },
  server: {
    port: 5522,
    strictPort: true,
  },
});
