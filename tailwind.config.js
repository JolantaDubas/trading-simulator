module.exports = {
  purge: ["./src/**/*.{html,ts}"],
  theme: {
    fontSize: {
      xs: ".75rem",
      sm: ".875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
    },
    fontWeight: {
      normal: 400,
      semibold: 600,
    },
    borderRadius: {
      lg: "0.5rem",
    },
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      primary: "#e9967a",
      // primary: "#063970",
      "primary-blue": "#063970",
      "light-blue": "#dcefff",
      white: "white",
      red: "red",
      green: "green",
      link: "#1e81b0",
      "gray-50": "#f7f7f7",
      "gray-100": "#f0f0f0",
      "gray-200": "#e2e2e2",

      "gray-500": "#6B7280",
      "gray-900": "#1e1e1f",
    },

    // spacing: {
    //   navScreen: "calc(100vh - 5rem)",
    //   auto: auto,
    //   full: "100%",
    //   8: "2rem"/* 32px */,
    //   10: "2.5rem"/* 40px */,
    //   20: "5rem"/* 80px */,
    // },
    extend: {
      spacing: {
        navScreen: "calc(100vh - 5rem)",
      },
    },
  },
  variants: {
    extend: {},
  },
  // plugins: [require("@tailwindcss/typography")],
};
