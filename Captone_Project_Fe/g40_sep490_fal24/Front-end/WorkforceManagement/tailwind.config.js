/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        border: 'borderColorCycle 2.5s linear infinite',
        "fade-in": 'fadeIn 0.3s ease-in-out',
      },
      keyframes: {
        borderColorCycle: {
          '0%': { borderColor: '#E4E2E9' },
          '33%': { borderColor: '#FF0000' },
          '66%': { borderColor: '#00FF00' },
          '100%': { borderColor: '#0000FF' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}

