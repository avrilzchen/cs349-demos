/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    extend: {},
  },
  /* remove Tailwind CSS reset */
  // corePlugins: {
  //   preflight: false,
  // },
};
