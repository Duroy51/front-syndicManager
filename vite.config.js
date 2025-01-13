import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  esbuild: {
    loader: "tsx", // Permet de traiter les fichiers .jsx comme du TypeScript
    include: /\.[jt]sx?$/
  },
})
