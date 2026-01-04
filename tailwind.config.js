/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef7ee',
          100: '#fdecd3',
          200: '#fad6a5',
          300: '#f7b86d',
          400: '#f39233',
          500: '#f0750c',
          600: '#e15a07',
          700: '#ba4208',
          800: '#94350e',
          900: '#772d0f',
        },
        african: {
          gold: '#D4AF37',
          earth: '#8B4513',
          sunset: '#FF6B35',
          forest: '#2D5016',
        }
      },
    },
  },
  plugins: [],
}
