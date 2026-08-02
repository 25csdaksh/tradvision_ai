/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Roboto Mono', 'monospace'],
      },
      colors: {
        brand: {
          50: '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a',
          900: '#14532d'
        },
        dark: {
          bg: '#0B0F17',
          card: '#131B2E',
          border: '#1E293B',
          hover: '#1A253D'
        }
      },
      boxShadow: {
        glow: '0 0 20px -5px rgba(34, 197, 94, 0.3)',
        'ai-glow': '0 0 25px -5px rgba(139, 92, 246, 0.3)'
      }
    }
  },
  plugins: []
};
