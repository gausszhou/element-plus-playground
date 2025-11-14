import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path';
import 'dotenv/config'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE_URL || '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  build: {
    outDir: process.env.VITE_BUILD_DIR || 'dist',
  },
})
