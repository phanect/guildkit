/* eslint-disable no-undef */ // FIXME cjs is not parsed properly by @phanect/lint currently

/** @type { import("tailwindcss").Config } */
const config = {
  content: [
    "./src/**/*.{html,js,svelte,ts}",
  ],

  theme: {
    extend: {
      animation: {
        "rotate-color": "rotate-color 5s linear infinite",
      },
      keyframes: {
        "rotate-color": {
          from: {
            transform: "rotate(0deg)",
          },
          to: {
            transform: "rotate(360deg)",
          },
        },
      },
    },
  },

  plugins: [
    require("@tailwindcss/forms"),
  ],
};

module.exports = config;
