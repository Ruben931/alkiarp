/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        alkia: {
          violet: '#8b00d2',
          violetLight: '#b47aff',
          bg: '#ededed',
          dark: '#181828',
          white: '#fff',
          gray: '#f7f3fa',
          darkBg: '#0a0a0a',
          darkGray: '#1a1a1a',
          lightGray: '#e0e0e0',
        },
      },
      fontFamily: {
        sora: ["Sora", "Montserrat", "Arial", "sans-serif"],
        montserrat: ["Montserrat", "Arial", "sans-serif"],
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(139,0,210,0.12)',
        glow: '0 0 16px 2px #8b00d2',
        'glass-lg': '0 12px 48px 0 rgba(139,0,210,0.18)',
      },
      borderRadius: {
        glass: '2rem',
      },
      backgroundImage: {
        'gradient-alkia': 'linear-gradient(90deg, #8b00d2 0%, #b47aff 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-in',
        'slide-up': 'slideUp 0.7s cubic-bezier(0.4,0,0.2,1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(40px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
} 