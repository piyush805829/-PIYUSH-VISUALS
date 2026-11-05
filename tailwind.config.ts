import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--bg-primary)",
        foreground: "var(--text-primary)",
        lime: {
          DEFAULT: "#D6FF48",
          400: "#D6FF48",
          500: "#B8E62B",
        },
        charcoal: {
          950: "#050505",
          900: "#080808",
          800: "#101010",
          700: "#181818",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        editorial: ["var(--font-inter)", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

