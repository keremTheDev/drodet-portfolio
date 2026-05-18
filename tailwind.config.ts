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
        primary: {
          DEFAULT: "#faf9f5",
          foreground: "#141413"
        },
        secondary: {
          DEFAULT: "#f0eee6",
          foreground: "#5e5d59"
        },
        accent: {
          clay: "#d97757",
          primary: "#c6613f"
        },
        neutral: {
          border: "#1414131A"
        },
        slate: {
          dark: "#141413",
          light: "#5e5d59"
        }
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["\"Source Serif 4\"", "serif"],
        mono: ["\"JetBrains Mono\"", "monospace"]
      },
      borderRadius: {
        brand: "0.5rem"
      },
      maxWidth: {
        "8xl": "90rem"
      },
      boxShadow: {
        quiet: "0 0 0 1px #1414131A"
      },
      backgroundImage: {
        "grain-soft": "radial-gradient(circle at top, rgba(217, 119, 87, 0.09), transparent 45%), radial-gradient(circle at bottom right, rgba(198, 97, 63, 0.08), transparent 35%)"
      }
    }
  },
  plugins: []
};

export default config;
