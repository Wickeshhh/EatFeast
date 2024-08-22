/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#FCFCFC",
        "secondary": "#1C1C1C",
        "green": "#39DB4A",
        "red": "#D94B1E",
        "yellow": "#E7D214"
      },
      fontFamily: {
        "primary": ['Poppins', 'sans-serif']
      }
    },
  },
  plugins: [require('daisyui')],  
}

