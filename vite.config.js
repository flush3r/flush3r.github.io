import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', 
  server: {
    watch: {
      usePolling: true, // Forces Vite to manually check files for changes
    }
  },
  build: {
    outDir: 'dist' 
  }
})