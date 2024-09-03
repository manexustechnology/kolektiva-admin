import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          main: "linear-gradient(81.62deg, rgb(49, 56, 96) 2.25%, rgb(21, 25, 40) 79.87%);",
          500: "linear-gradient(81.62deg, rgb(49, 56, 96) 2.25%, rgb(21, 25, 40) 79.87%);",
          600: "linear-gradient(81.62deg, rgb(79, 86, 126) 2.25%, rgb(51, 55, 70) 79.87%);",
          700: "linear-gradient(81.62deg, rgb(99, 106, 146) 2.25%, rgb(71, 75, 90) 79.87%);",
        },
        flatprimary: {
          main: "rgb(21, 25, 40)",
          500: "rgb(21, 25, 40)",
          600: "rgb(51, 55, 70)",
          700: "rgb(71, 75, 90)",
        },
        teal: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
        },
      },
    },
  },
  plugins: [forms],
  corePlugins: {
    preflight: false,
  },
};
