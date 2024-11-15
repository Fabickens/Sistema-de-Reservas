/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary':'#5f6FFF',
        'verde':'#26d9d0',
        'celeste':'#22c3bb'
      }
    },
  },
  plugins: [],
}