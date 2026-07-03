import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: '.' // Keeps the build files at the root for GitHub Pages
  }
})