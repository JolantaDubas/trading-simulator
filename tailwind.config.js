module.exports = {
  purge: ["./src/**/*.{html,ts}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#e9967a",
        // primary: "#063970",
        "primary-blue": "#063970",
        "light-blue": "#dcefff",
        link: "#1e81b0",
        "gray-100": "#f0f0f0",
        "gray-200": "#f2e6d8",
        "gray-900": "#1e1e1f",
      },
      spacing: {
        navScreen: "calc(100vh - 5rem)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
