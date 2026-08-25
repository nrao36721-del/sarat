/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        saffron: {
          50: "#FFF8F0",
          100: "#FFE8CC",
          200: "#FFD199",
          300: "#FFB84D",
          400: "#FF9E1A",
          500: "#FF8C00",
          600: "#E67E00",
          700: "#B86200",
          800: "#8A4900",
          900: "#5C2F00",
        },
      },
      fontFamily: {
        sans: ["Noto Sans", "system-ui", "sans-serif"],
        devanagari: ["Noto Sans Devanagari", "system-ui", "sans-serif"],
        telugu: ["Noto Sans Telugu", "system-ui", "sans-serif"],
      },
      keyframes: {
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "wheel-spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "rise-in": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-out": "fade-out 700ms ease-in-out forwards",
        "wheel-spin": "wheel-spin 12s linear infinite",
        "rise-in": "rise-in 600ms ease-out forwards",
      },
    },
  },
  plugins: [],
};
