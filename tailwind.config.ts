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
        primary: {
          DEFAULT: 'var(--color-primary)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
        },
        background: {
          DEFAULT: 'var(--color-bg)',
        },
        surface: {
          DEFAULT: 'var(--color-surface)',
          hover: 'var(--color-surface-hover)',
        },
        'text-base': {
          DEFAULT: 'var(--color-text)',
        },
        'text-muted': {
          DEFAULT: 'var(--color-text-muted)',
        },
        border: {
          DEFAULT: 'var(--color-border)',
        },
        warning: {
          bg: 'var(--color-warning-bg)',
          border: 'var(--color-warning-border)',
          text: 'var(--color-warning-text)',
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "serif"],
        body: ["var(--font-body)", "serif"],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
