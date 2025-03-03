import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/amadeus': {
        target: 'https://test.api.amadeus.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/amadeus/, '')
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  esbuild: {
    loader: 'jsx', // Traite les fichiers .jsx comme du TypeScript
    include: /src\/.*\.[jt]sx?$/, // Inclut tous les fichiers .js, .jsx, .ts, .tsx dans src/
    exclude: /node_modules/, // Exclut node_modules
  },
});

