/** @type {import("tailwindcss").Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        "8xl": "90rem"
      },
      fontFamily: {
        "poppins": ["Poppins", "serif"]
      },
      colors: {
        "charcoal": "#2C2C2C",
        "white": "#FFFFFF",
        "teal": "#008080",
        "gray": "#F5F5F5",
        "orange": "#FF8C42"
      },
      backgroundImage: {
        'banner': 'url("/src/assets/banner.jpg")'
      },
    },
  },
  plugins: [require("daisyui")],
}