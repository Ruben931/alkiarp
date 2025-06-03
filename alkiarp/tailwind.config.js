/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'alkia': {
          violet: '#2c9af2',
          violetLight: '#5ba7f5',
          cyan: '#00d4ff',
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
        'mono': ['Fira Code', 'Monaco', 'Consolas', 'monospace'],
        'neural': ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'alkia-glow': '0 0 20px rgba(44, 154, 242, 0.5)',
        'alkia-glow-lg': '0 0 40px rgba(44, 154, 242, 0.5)',
        'neural': '0 8px 32px rgba(44, 154, 242, 0.2)',
        'glow': '0 0 16px 2px #2c9af2',
        'glow-sm': '0 0 8px 1px rgba(44, 154, 242, 0.3)',
        'glow-md': '0 0 12px 2px rgba(44, 154, 242, 0.4)',
        'glow-lg': '0 0 20px 3px rgba(44, 154, 242, 0.5)',
        'holographic': '0 0 30px rgba(44, 154, 242, 0.6)',
        glass: '0 8px 32px 0 rgba(139,0,210,0.12)',
      },
      borderRadius: {
        glass: '2rem',
      },
      backgroundImage: {
        'gradient-neural': 'linear-gradient(135deg, rgba(44, 154, 242, 0.1) 0%, rgba(0, 212, 255, 0.1) 100%)',
        'gradient-holographic': 'linear-gradient(45deg, #2c9af2, #5ba7f5, #00d4ff, #2c9af2)',
        'gradient-alkia': 'linear-gradient(90deg, #2c9af2 0%, #5ba7f5 100%)',
        'mesh-gradient': 'radial-gradient(at 40% 20%, #2c9af2 0px, transparent 50%), radial-gradient(at 80% 0%, #00d4ff 0px, transparent 50%), radial-gradient(at 0% 50%, #5ba7f5 0px, transparent 50%)'
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'holographic': 'holographic 8s ease-in-out infinite',
        'neural-pulse': 'neural-pulse 3s ease-in-out infinite',
        'quantum': 'quantum 10s linear infinite',
        'data-flow': 'data-flow 20s linear infinite',
        'rotate-slow': 'rotate-slow 20s linear infinite',
        'bounce-slow': 'bounce-slow 3s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.8s ease-out',
        'slide-in-right': 'slide-in-right 0.6s ease-out',
        'scale-in': 'scale-in 0.5s ease-out',
        'fade-in': 'fadeIn 1s ease-in',
        'slide-up': 'slideUp 0.7s cubic-bezier(0.4,0,0.2,1)',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(44, 154, 242, 0.5)',
            transform: 'scale(1)' 
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(44, 154, 242, 0.8), 0 0 60px rgba(44, 154, 242, 0.3)',
            transform: 'scale(1.05)' 
          },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'holographic': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'neural-pulse': {
          '0%, 100%': { 
            opacity: '0.8',
            transform: 'scale(1)' 
          },
          '50%': { 
            opacity: '1',
            transform: 'scale(1.1)' 
          },
        },
        'quantum': {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '25%': { transform: 'rotate(90deg) scale(1.1)' },
          '50%': { transform: 'rotate(180deg) scale(1)' },
          '75%': { transform: 'rotate(270deg) scale(0.9)' },
          '100%': { transform: 'rotate(360deg) scale(1)' },
        },
        'data-flow': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100vw)' },
        },
        'rotate-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'bounce-slow': {
          '0%, 100%': { 
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' 
          },
          '50%': { 
            transform: 'translateY(-25%)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' 
          },
        },
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'slide-in-right': {
          '0%': {
            opacity: '0',
            transform: 'translateX(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        'scale-in': {
          '0%': {
            opacity: '0',
            transform: 'scale(0.9)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(40px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      backdropBlur: {
        'xs': '2px',
        'neural': '12px',
        'ultra': '25px',
      },
      blur: {
        'xs': '2px',
        'neural': '12px',
        'ultra': '25px',
      },
    },
  },
  plugins: [],
} 