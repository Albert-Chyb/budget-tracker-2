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
    },
  },
});
