/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#050505",
        obsidian: "#0a0a0a",
        carbon: "#111111",
        graphite: "#1a1a1a",
        slate: "#2a2a2a",
        ash: "#8a8a8a",
        bone: "#e8e4df",
        ivory: "#f5f2ed",
        mirai: {
          glow: "#c9a84c",
          soft: "#e8d5a0",
          dim: "#7a6930",
        },
        jj: {
          glow: "#7ec8e3",
          soft: "#b8dff0",
          dim: "#4a7a8c",
        },
        chelsea: {
          glow: "#d4956a",
          soft: "#e8c4a8",
          dim: "#8a6040",
        },
        accent: {
          warm: "#ff6b35",
          cool: "#4ecdc4",
          violet: "#7b68ee",
        },
      },
      fontFamily: {
        display: ['"PP Neue Montreal"', '"Neue Haas Grotesk"', '"Helvetica Neue"', 'sans-serif'],
        body: ['"Suisse Intl"', '"Helvetica Neue"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"SF Mono"', 'monospace'],
      },
      fontSize: {
        "display-xl": ["clamp(3.5rem, 8vw, 9rem)", { lineHeight: "0.92", letterSpacing: "-0.04em" }],
        "display-lg": ["clamp(2.5rem, 5vw, 5.5rem)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        "display-md": ["clamp(1.8rem, 3.5vw, 3.5rem)", { lineHeight: "1.0", letterSpacing: "-0.025em" }],
        "display-sm": ["clamp(1.3rem, 2.5vw, 2rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6" }],
        "body-md": ["1rem", { lineHeight: "1.6" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5" }],
        "caption": ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.08em" }],
      },
      spacing: {
        "section": "clamp(6rem, 12vh, 12rem)",
        "block": "clamp(3rem, 6vh, 6rem)",
      },
      borderRadius: {
        "architectural": "2px",
      },
      animation: {
        "fade-up": "fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fadeIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-in": "slideIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "glow-pulse": "glowPulse 4s ease-in-out infinite",
        "grain": "grain 8s steps(10) infinite",
        "float": "float 6s ease-in-out infinite",
        "orbit": "orbit 20s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5%, -10%)" },
          "20%": { transform: "translate(-15%, 5%)" },
          "30%": { transform: "translate(7%, -25%)" },
          "40%": { transform: "translate(-5%, 25%)" },
          "50%": { transform: "translate(-15%, 10%)" },
          "60%": { transform: "translate(15%, 0%)" },
          "70%": { transform: "translate(0%, 15%)" },
          "80%": { transform: "translate(3%, 35%)" },
          "90%": { transform: "translate(-10%, 10%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        orbit: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
};
