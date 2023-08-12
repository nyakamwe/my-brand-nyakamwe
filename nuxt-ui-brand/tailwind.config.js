/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./components/**/*.{js,vue,ts}",
      "./layouts/**/*.vue",
      "./pages/**/*.vue",
      "./plugins/**/*.{js,ts}",
      "./nuxt.config.{js,ts}",
      "./app.vue",
      "./error.vue",
    ],
    theme: {
      extend: {},
      colors: {
        primary: "#44B64D",
        secondary: "#004449",
        link: "#60AEFB",
        white: "#ffffff",
        dark: "#343E4E",
        green: {
          500: "#16a34a",
        },
        danger: "#C9171F",
        blue: {
          500: "#3b82f6",
        },
        alert: {
          info: {
            700: "#0072E3",
            500: "#60AEFB",
            100: "#EEF2FA",
          },
          success: {
            700: "#1B883C",
            500: "#5DB076",
            100: "#EDF9F0",
          },
          danger: {
            700: "#C9171F",
            500: "#E96268",
            100: "#FEEFEF",
          },
          warning: {
            700: "#DF6321",
            500: "#F0A47B",
            100: "#FFF4EC",
          },
        },
        status: {
          pending: {
            100: "#F0FCFF",
            500: "#39DEFC",
            700: "#005969",
          },
          active: {
            100: "#E8EDFF",
            500: "#0072E3",
            700: "#003B7A",
          },
          onboarded: {
            100: "#E3D9FF",
            500: "#6554C0",
            700: "#262185",
          },
          accepted: {
            100: "#FFE8C9",
            500: "#FFAB00",
            700: "#825700",
          },
          failed: {
            100: "#FFEDE8",
            500: "#C9171F",
            700: "#8C000D",
          },
          completed: {
            100: "#E8FFF2",
            500: "#36B37E",
            700: "#005436",
          },
        },
        gray: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
      },
    },
    plugins: [],
};
