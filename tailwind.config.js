/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy:        '#1C3248',
          'navy-dark': '#142638',
          green:       '#4C7964',
          'green-dark':'#3d6353',
          'green-light':'#e0ece7',
        },
      },
    },
  },
  plugins: [],
}
