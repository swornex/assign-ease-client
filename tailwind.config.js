/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts}"],
  theme: {
    extend: {
      colors: {
        blackPearl: {
          200: "#e1e1e2",
          300: "#cfd1d2",
          400: "#a1a5a8",
          500: "#6b7277",
          600: "#18232a",
          700: "#0f161b"
        },
        nightRider: {
          200: "#cacaca",
          300: "#979797",
          400: "#5c5c5c",
          500: "#333333",
          600: "#212121",
          700: "#151515"
        },
        whitePearl: {
          200: "#f5f5fa",
          300: "#ebebf0",
          400: "#e6e6eb",
          500: "#f5f0f0",
          600: "#f0ebeb",
          700: "#ebe6e6",
          800: "#e5e1e1",
          900: "#E9DCC9"
        }
      }
    }
  },
  plugins: []
};
