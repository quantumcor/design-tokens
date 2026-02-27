// ═══════════════════════════════════════════════════
// QuantumCor Tailwind Config
// Generated from tokens.json — DO NOT EDIT DIRECTLY
// ═══════════════════════════════════════════════════

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,html}', './app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#2369FE',
          hover: '#4A85FE',
          muted: 'rgba(35, 105, 254, 0.15)',
          wash: 'rgba(35, 105, 254, 0.05)',
        },
        neutral: {
          '50': '#FBFBFB',
          '100': '#EEEEEE',
          '200': '#CCCCCC',
          '300': '#AAAAAA',
          '400': '#444444',
          '500': '#333333',
          '600': '#222222',
          '700': '#1A1A1A',
          '800': '#111111',
          '900': '#090909',
          '950': '#050505',
          'white': '#FFFFFF',
        },
        surface: {
          'page': '#090909',
          'nav': '#090909',
          'card': '#111111',
          'card-hover': '#1A1A1A',
          'input': '#1A1A1A',
          'overlay': 'rgba(0, 0, 0, 0.7)',
          'tooltip': '#222222',
        },
        semantic: {
          success: '#059669',
          'success-light': '#D1FAE5',
          'success-dark': '#064E3B',
          warning: '#D97706',
          'warning-light': '#FEF3C7',
          'warning-dark': '#78350F',
          error: '#DC2626',
          'error-light': '#FEE2E2',
          'error-dark': '#7F1D1D',
        },
      },

      fontFamily: {
        primary: ['Montserrat', 'sans-serif'],
        mono: ['Inconsolata', 'monospace'],
      },

      fontSize: {
        'hero': '3rem',
        'display': '2.5rem',
        'h1': '2.25rem',
        'h2': '1.5rem',
        'h3': '1.25rem',
        'lg': '1.125rem',
        'base': '1rem',
        'sm': '0.875rem',
        'xs': '0.7rem',
        'xxs': '0.6rem',
      },

      borderRadius: {
        card: '0.75rem',
        pill: '100px',
      },

      boxShadow: {
        'glow': '0 0 20px rgba(35, 105, 254, 0.15)',
        'glow-strong': '0 0 40px rgba(35, 105, 254, 0.25)',
      },

      backgroundImage: {
        'hero-orb': 'radial-gradient(circle at 70% 180%, rgba(255, 239, 11, 0.35), transparent 57%), radial-gradient(circle at 100% 100%, #090909, transparent 33%), radial-gradient(circle farthest-side at 100% 0%, #2369FE 11%, transparent 46%), radial-gradient(circle at 0% 100%, #752F01, #090909 36%, #222222)',
        'card-accent': 'radial-gradient(circle at 100% 100%, rgba(35, 105, 254, 0.19), transparent 67%), linear-gradient(45deg, #111111, #222222)',
        'subtle-glow': 'radial-gradient(circle at 100% 0px, rgba(35, 105, 254, 0.05), transparent 67%)',
      },

      transitionDuration: {
        fast: '150ms',
        base: '200ms',
        slow: '300ms',
      },

      screens: {
        'sm': '480px',
        'md': '768px',
        'lg': '992px',
        'xl': '1280px',
        'xxl': '1440px',
      },
    },
  },
  plugins: [],
};
