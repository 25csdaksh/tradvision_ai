/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fdf4',
          500: '#22c55e',
          900: '#14532d'
        },
        dark: {
          bg: '#0B0F17',
          card: '#131B2E',
          border: '#1E293B'
        }
      }
    }
  },
  plugins: []
};
