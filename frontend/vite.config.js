import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react/jsx-runtime'
    ],
  },
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:5000'
    }
  }
})
