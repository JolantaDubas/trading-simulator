module.exports = {
  purge: ['./src/**/*.{html,ts}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#a8006b",
        "gray-100": "#f0f0f0",
        "gray-200": "#edebe8",
        "gray-900": "#1e1e1f"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
