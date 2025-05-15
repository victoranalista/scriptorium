import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  darkMode: ["class", ".dark"],

  content: [
    "./app/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],

  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },

    extend: {
      colors: {
        border: "hsl(0 0% 80%)",
        input: "hsl(0 0% 95%)",
        ring: "hsl(0 0% 10%)",
        background: "hsl(0 0% 100%)",
        foreground: "hsl(0 0% 0%)",

        primary: {
          DEFAULT: "hsl(0 0% 0%)", // preto
          foreground: "hsl(0 0% 100%)", // branco
        },
        secondary: {
          DEFAULT: "hsl(0 0% 100%)", // branco
          foreground: "hsl(0 0% 0%)", // preto
        },
        muted: {
          DEFAULT: "hsl(0 0% 96%)",
          foreground: "hsl(0 0% 40%)",
        },
        accent: {
          DEFAULT: "hsl(0 0% 90%)",
          foreground: "hsl(0 0% 10%)",
        },
        destructive: {
          DEFAULT: "hsl(0 100% 50%)",
          foreground: "hsl(0 0% 100%)",
        },
      },

      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },

      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },

      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["Fira Code", "monospace"],
      },
    },
  },

  plugins: [
    require("tailwindcss-animate"),
    plugin(({ addBase }) => {
      addBase({
        ":root": {
          "--background": "0 0% 100%",
          "--foreground": "0 0% 0%",
          "--primary": "0 0% 0%",
          "--primary-foreground": "0 0% 100%",
          "--secondary": "0 0% 100%",
          "--secondary-foreground": "0 0% 0%",
          "--muted": "0 0% 96%",
          "--muted-foreground": "0 0% 40%",
          "--accent": "0 0% 90%",
          "--accent-foreground": "0 0% 10%",
          "--destructive": "0 100% 50%",
          "--destructive-foreground": "0 0% 100%",
          "--ring": "0 0% 10%",
          "--input": "0 0% 95%",
          "--border": "0 0% 80%",
        },
        ".dark": {
          "--background": "0 0% 0%",
          "--foreground": "0 0% 100%",
          "--primary": "0 0% 100%",
          "--primary-foreground": "0 0% 0%",
          "--secondary": "0 0% 15%",
          "--secondary-foreground": "0 0% 100%",
          "--muted": "0 0% 10%",
          "--muted-foreground": "0 0% 60%",
          "--accent": "0 0% 20%",
          "--accent-foreground": "0 0% 100%",
          "--destructive": "0 100% 50%",
          "--destructive-foreground": "0 0% 100%",
          "--ring": "0 0% 80%",
          "--input": "0 0% 20%",
          "--border": "0 0% 40%",
        },
      });
    }),
  ],
};

export default config;
