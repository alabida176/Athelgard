/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0c0a09',
        'dark-card': '#1a1714',
        'gold': '#c9a84c',
        'parchment': '#f5e6c8',
        'parchment-dark': '#d4c5a0'
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif']
      },
      opacity: {
        '15': '0.15',
        '25': '0.25'
      }
    }
  },
  plugins: [require('@tailwindcss/forms')]
};
