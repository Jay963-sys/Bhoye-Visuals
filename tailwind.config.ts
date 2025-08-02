import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF3100",
        dark: "#C10801",
        grey: "#333333",
        "brand-primary": "#FF3100",
        "brand-dark": "#C10801",
        "brand-gray": "#333333",
      },
      fontFamily: {
        body: ["Inter", "sans-serif"],
        display: ["Oswald", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 8s ease-in-out infinite",
        "pulse-slower": "pulse 12s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
