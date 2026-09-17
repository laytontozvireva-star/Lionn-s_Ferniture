/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      colors: {
        cream: {
          DEFAULT: '#F7F4EE',
          soft: '#FBF9F5',
        },
        stone: {
          DEFAULT: '#E6E0D4',
          dark: '#D3CBB8',
        },
        umber: {
          DEFAULT: '#2A241C',
          soft: '#5C5347',
        },
        olive: {
          50: '#EEF1EA',
          100: '#D8DECB',
          400: '#6B7A5A',
          500: '#4B5B3F',
          600: '#3C4A33',
          700: '#2E3927',
        },
        brass: {
          400: '#C7A868',
          500: '#B4924C',
          600: '#96793C',
        },
      },
      borderRadius: {
        card: '14px',
        control: '10px',
      },
      boxShadow: {
        soft: '0 2px 10px -2px rgba(42, 36, 28, 0.08)',
        lifted: '0 12px 28px -8px rgba(42, 36, 28, 0.18)',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}