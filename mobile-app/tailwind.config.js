/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/line-clamp"),
    require("flowbite/plugin"),
  ],
};
