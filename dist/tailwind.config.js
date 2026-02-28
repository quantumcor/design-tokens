// ═══════════════════════════════════════════════════
// QuantumCor Tailwind Config — Sentinel v2
// Generated from files/tokens.json — DO NOT EDIT
// ═══════════════════════════════════════════════════

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,html,astro}', './app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: {
            light: '#D9E5FF',
            DEFAULT: '#2D62FF',
            dark: '#080331',
          },
          pink: {
            light: '#FFAEFE',
            DEFAULT: '#DD23BB',
            dark: '#3C043B',
          },
        },
        neutral: {
          'black': '#000000',
          'white': '#FFFFFF',
          'lightest': '#EEEEEE',
          'lighter': '#CCCCCC',
          'light': '#AAAAAA',
          'default': '#666666',
          'dark': '#444444',
          'darker': '#222222',
          'darkest': '#111111',
        },
      },

      fontFamily: {
        body: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },

      fontSize: {
        'base': '1rem',
        'tiny': '0.75rem',
        'small': '0.875rem',
        'regular': '1rem',
        'medium': '1.25rem',
        'large': '1.5rem',
        'h1': ['4rem', { lineHeight: '1.1', fontWeight: '700' }],
        'h2': ['3rem', { lineHeight: '1.2', fontWeight: '700' }],
        'h3': ['2rem', { lineHeight: '1.2', fontWeight: '700' }],
        'h4': ['1.5rem', { lineHeight: '1.4', fontWeight: '700' }],
        'h5': ['1.25rem', { lineHeight: '1.5', fontWeight: '700' }],
        'h6': ['1rem', { lineHeight: '1.5', fontWeight: '700' }],
      },

      spacing: {
        'tiny': '0.125rem',
        'xxsmall': '0.25rem',
        'xsmall': '0.5rem',
        'small': '1rem',
        'custom1': '1.5rem',
        'medium': '2rem',
        'custom2': '2.5rem',
        'large': '3rem',
        'custom3': '3.5rem',
        'xlarge': '4rem',
        'xxlarge': '5rem',
        'huge': '6rem',
        'xhuge': '8rem',
        'xxhuge': '12rem',
        'section-sm': '3rem',
        'section-md': '5rem',
        'section-lg': '8rem',
        'global': '2.5rem',
      },

      maxWidth: {
        'container-sm': '48rem',
        'container-md': '64rem',
        'container-lg': '80rem',
      },

      borderRadius: {
        'button': '0.25rem',
        'card': '0.25rem',
      },
    },
  },
  plugins: [],
};
