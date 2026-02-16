import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        cosmic: {
          950: "#02030a",
          900: "#070b1c",
          800: "#0f1630",
          700: "#172247"
        }
      },
      boxShadow: {
        glow: "0 0 25px color-mix(in srgb, var(--accent-color) 55%, transparent)",
        card: "0 18px 40px rgba(2, 6, 23, 0.55)"
      },
      backgroundImage: {
        "hero-grid": "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)",
        "animated-border": "linear-gradient(120deg, rgba(34,211,238,0.65), rgba(251,113,133,0.75), rgba(56,189,248,0.65))"
      }
    }
  },
  plugins: []
};

export default config;