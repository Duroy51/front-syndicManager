import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth-api': {
        target: 'https://gateway.yowyob.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/auth-api/, '')
      }
    }
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname,'./src'),
    },
  },
  esbuild: {
    loader: 'jsx', // Traite les fichiers .jsx comme du TypeScript
    include: /src\/.*\.[jt]sx?$/, // Inclut tous les fichiers .js, .jsx, .ts, .tsx dans src/
    exclude: /node_modules/, // Exclut node_modules
  },
})

