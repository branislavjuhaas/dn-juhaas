/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,css,vue}"],
  theme: {
    fontFamily: {
      mono: ["Space Mono", "monospace"],
    },
    colors: {
      blue: {
        dark: "#2b3745",
        light: "#8cb3df",
      },
      white: "#e8e8e8",
      black: "#000000",
      yellow: "#f5da6c",
      green: "#afcdbc",
      red: "#f9afaa",
    },
  },

  plugins: [],
};
