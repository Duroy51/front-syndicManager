import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Toute requête vers /auth-service sera redirigée vers le serveur cible.
      '/auth-service': {
        target: 'https://gateway.yowyob.com',
        changeOrigin: true,
        secure: false, // À utiliser si le certificat du serveur n'est pas validé
        // Vous pouvez éventuellement réécrire le chemin si besoin :
        // rewrite: (path) => path.replace(/^\/auth-service/, '')
      },
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
})

