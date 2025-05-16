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
    port: 5176,
    proxy: {
      '/languages': {
        target: 'https://extensions.aitopia.ai',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/languages/, '/languages'),
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            proxyReq.setHeader('Origin', 'https://extensions.aitopia.ai');
            proxyReq.setHeader('Referer', 'https://extensions.aitopia.ai');
          });
          proxy.on('proxyRes', (proxyRes, req, res) => {
            proxyRes.headers['Access-Control-Allow-Origin'] = '*';
            proxyRes.headers['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,PATCH,OPTIONS';
            proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, X-Requested-With';
            proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
          });
        }
      },
      '/ai': {
        target: 'https://extensions.aitopia.ai',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/ai/, '/ai'),
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            proxyReq.setHeader('Origin', 'https://extensions.aitopia.ai');
            proxyReq.setHeader('Referer', 'https://extensions.aitopia.ai');
          });
          proxy.on('proxyRes', (proxyRes, req, res) => {
            proxyRes.headers['Access-Control-Allow-Origin'] = '*';
            proxyRes.headers['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,PATCH,OPTIONS';
            proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, X-Requested-With';
            proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
          });
        }
      },
      '/extensions': {
        target: 'https://extensions.aitopia.ai',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/extensions/, '/extensions'),
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            proxyReq.setHeader('Origin', 'https://extensions.aitopia.ai');
            proxyReq.setHeader('Referer', 'https://extensions.aitopia.ai');
          });
          proxy.on('proxyRes', (proxyRes, req, res) => {
            proxyRes.headers['Access-Control-Allow-Origin'] = '*';
            proxyRes.headers['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,PATCH,OPTIONS';
            proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, X-Requested-With';
            proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
          });
        }
      },
      '/auth-api': {
        target: 'https://gateway.yowyob.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/auth-api/, '')
      },
      '/api': {
        target: 'https://extensions.aitopia.ai',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    middlewares: [
      (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        next();
      }
    ]
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname,'./src'),
    },
  },
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.[jt]sx?$/,
    exclude: /node_modules/,
  },
})
