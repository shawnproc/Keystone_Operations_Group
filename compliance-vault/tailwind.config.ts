import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50:  '#eef2ff',
          100: '#e0e7ff',
          600: '#1e3a5f',
          700: '#162d4a',
          800: '#0f2137',
          900: '#0a1628',
          950: '#050d1a',
        },
        compliance: {
          green:   '#10b981',
          amber:   '#f59e0b',
          red:     '#ef4444',
          blue:    '#3b82f6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
