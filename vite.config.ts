import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Relative asset paths so the build works at a domain root (Netlify/Vercel)
  // and in a subfolder (GitHub Pages: username.github.io/portfolio/).
  base: './',
})
