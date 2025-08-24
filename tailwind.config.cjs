/** @type { import("tailwindcss").Config } */
const config = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],

  plugins: [
    require("@tailwindcss/forms"),
  ],
};

module.exports = config;
