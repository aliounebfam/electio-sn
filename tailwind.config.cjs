/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  important: '#root',
  theme: {
    extend: {
      fontFamily: {
        Comfortaa: ['Comfortaa', 'cursive'],
        Hind: ['Hind', 'sans-serif'],
        Trykker: ['Trykker', 'serif']
      },
    },
    screens: {
      'xs': '300px',
      ...defaultTheme.screens,
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
