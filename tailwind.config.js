module.exports = {
  purge: ["./src/**/*.{html,ts}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#d90d32",
        // primary: "#063970",
        "primary-blue": "#063970",
        link: "#1e81b0",
        "gray-100": "#f0f0f0",
        "gray-200": "#f2e6d8",
        "gray-900": "#1e1e1f",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
