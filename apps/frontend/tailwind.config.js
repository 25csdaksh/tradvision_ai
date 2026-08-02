/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Roboto Mono', 'monospace'],
      },
      colors: {
        app: {
          bg: '#EFEFF4',
          card: '#FFFFFF',
          sidebar: '#F8FAFC',
          border: '#E2E8F0',
          text: '#1E293B',
          muted: '#64748B'
        },
        emerald: {
          50: '#F2FDF5',
          100: '#DEF7EC',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B'
        }
      },
      boxShadow: {
        card: '0 4px 20px -2px rgba(0, 0, 0, 0.03), 0 2px 6px -1px rgba(0, 0, 0, 0.02)',
        soft: '0 10px 30px -5px rgba(0, 0, 0, 0.05)'
      }
    }
  },
  plugins: []
};
