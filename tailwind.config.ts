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
        primary: { DEFAULT: "#2D4A3E" },
        accent: { DEFAULT: "#C4622D" },
        background: { DEFAULT: "#FAF7F2" },
        surface: { DEFAULT: "#FFFFFF" },
        "text-base": { DEFAULT: "#1A1714" },
        "text-muted": { DEFAULT: "#5A4F45" },
        border: { DEFAULT: "#E5DDD5" },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "serif"],
        body: ["var(--font-body)", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
