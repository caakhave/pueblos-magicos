import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'cherry-tomato': '#A13228',
        'fresco-cream': '#C9B99A',
        'georgian-blue': '#7AB9CA',
        'daring': '#C8573A',
        'tricorn-black': '#2B2B2B',
        'dormer-brown': '#7C6652',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
