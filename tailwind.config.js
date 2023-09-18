/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      mobile: { max: "767px" },
      tablet: { max: "919px", min: "768px" },
      desktop: { max: "1231px", min: "920px" },
    },
    extend: {
      colors: {
        darkHorizon: "rgb(0, 0, 0)",
        lightSky: "rgb(255, 255, 255)",
      },
    },
    fontFamily: {
      barlow: ["Barlow", "sans-serif"],
    },
  },
  plugins: [],
};
