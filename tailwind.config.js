/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0a0f1d',
          800: '#0f172a',
          700: '#1e293b',
          600: '#334155',
        },
        emerald: {
          500: '#10b981',
          400: '#34d399',
        },
        indigo: {
          500: '#6366f1',
          600: '#4f46e5',
        }
      },
      fontFamily: {
        sans: ['Pretendard', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
