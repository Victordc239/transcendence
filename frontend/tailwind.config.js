/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  darkMode: "class",

  theme: {
    extend: {
      colors: {
        bgPrimary: "var(--bg-primary)",
        bgSecondary: "var(--bg-secondary)",

        textPrimary: "var(--text-primary)",
        textSecondary: "var(--text-secondary)",

        glass: "var(--glass-bg)",
        glassBorder: "var(--glass-border)",

        pinkPrimary: "var(--pink-primary)",
        purplePrimary: "var(--purple-primary)",
        bluePrimary: "var(--blue-primary)",
        greenPrimary: "var(--green-primary)",

        neonPurple: "var(--neon-purple)",
        neonBlue: "var(--neon-blue)",
        neonPink: "var(--neon-pink)",
      },

      boxShadow: {
        glass:
          "0 8px 32px rgba(31, 38, 135, 0.15)",

        neon:
          "0 0 24px rgba(168, 85, 247, 0.25)",

        soft:
          "0 4px 20px rgba(15, 23, 42, 0.08)",
      },

      backdropBlur: {
        xs: "2px",
      },

      borderRadius: {
        glass: "28px",
      },

      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },

      fontSize: {
        hero: ["4rem", { lineHeight: "1" }],
        title: ["2rem", { lineHeight: "1.2" }],
        section: ["1.5rem", { lineHeight: "1.3" }],
        body: ["1rem", { lineHeight: "1.6" }],
        small: ["0.875rem", { lineHeight: "1.4" }],
      },

      animation: {
        float: "float 6s ease-in-out infinite",
        pulseSoft: "pulseSoft 3s ease-in-out infinite",
      },

      keyframes: {
        float: {
          "0%, 100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-6px)",
          },
        },

        pulseSoft: {
          "0%, 100%": {
            opacity: "1",
          },
          "50%": {
            opacity: ".85",
          },
        },
      },
    },
  },

  plugins: [],
};