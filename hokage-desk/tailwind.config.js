/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#4A6741",
        "background-light": "#FDFBF5",
        "background-dark": "#2D2D2D",
        "card-dark": "#3C3C3C",
        "leaf-green": {
            DEFAULT: "#4A5C43",
            dark: "#3A4A35"
        },
        "text-light": "#2D3748",
        "text-dark": "#E2E8F0",
      },
      fontFamily: {
        "display": ["Space Grotesk", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px"
      },
    },
  },
  plugins: [],
}
