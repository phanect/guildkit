/* eslint-disable no-undef */ // FIXME cjs is not parsed properly by @phanect/lint currently

/** @type { import("tailwindcss").Config } */
const config = {
  content: [
    "./src/**/*.{html,js,svelte,ts}",
  ],

  plugins: [
    require("@tailwindcss/forms"),
  ],
};

module.exports = config;
