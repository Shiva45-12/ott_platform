/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#000000', // Pitch black
          secondary: '#141414', // Slightly lighter black for cards
          tertiary: '#1A1A1A'
        },
        primary: {
          DEFAULT: '#fbb700', // SonyLIV Yellow
          hover: '#ffd64d'
        },
        sonyblue: {
          DEFAULT: '#0f3c96', // SonyLIV Blue
          hover: '#1952c4'
        },
        secondary: {
          DEFAULT: '#262626', // Dark gray
          hover: '#333333'
        },
        accent: {
          DEFAULT: '#E50914' // Keeping red just in case it's needed for errors/badges
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
