/** @type {import('tailwindcss').Config} */
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
      }
    },
  },
  plugins: [],
}
