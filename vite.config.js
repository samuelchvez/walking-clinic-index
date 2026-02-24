import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 2000,   // mapbox-gl is inherently large (~1.7 MB)
    rollupOptions: {
      output: {
        manualChunks: {
          // Split mapbox-gl into its own lazy chunk so the app bundle stays small
          mapbox: ['mapbox-gl'],
        },
      },
    },
  },
})
