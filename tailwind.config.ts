import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./components-order/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        coin: {
          bg: "#030712",
          card: "#0a1628",
          border: "rgba(255,255,255,0.08)",
          green: "#22c55e",
          greenHi: "#4ade80",
          cyan: "#22d3ee",
          cyanHi: "#06b6d4",
          red: "#f43f5e",
          muted: "#94a3b8",
          input: "rgba(15, 23, 42, 0.65)",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
      },
      boxShadow: {
        neon: "0 0 22px rgba(34, 211, 238, 0.3)",
        "neon-strong": "0 0 32px rgba(34, 211, 238, 0.45)",
        glass: "0 8px 40px rgba(0, 0, 0, 0.5)",
      },
      animation: {
        "banner-fade": "bannerFade 0.5s ease-out",
        "scan-slow": "scanline 8s linear infinite",
        "pulse-neon": "pulseNeon 3s ease-in-out infinite",
      },
      keyframes: {
        bannerFade: {
          "0%": { opacity: "0", transform: "translateX(8px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        pulseNeon: {
          "0%, 100%": { opacity: "0.5", filter: "brightness(1)" },
          "50%": { opacity: "1", filter: "brightness(1.15)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
