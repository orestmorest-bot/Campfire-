import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // BASE_PATH is set when publishing to GitHub Pages, where the app lives under /<repository>/.
  base: process.env.BASE_PATH || '/',
  test: {
    environment: 'node',
    include: ['src/**/*.test.js'],
  },
})
