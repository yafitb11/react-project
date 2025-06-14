import flowbite from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        lightblue: '#ADD8E6',
      },
      screens: {
        'xs': '250px',
      },
    },
  },
  plugins: [flowbite.plugin()],
};
