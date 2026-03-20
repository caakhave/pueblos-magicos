import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/pueblos-magicos/',
  plugins: [react()],
})
