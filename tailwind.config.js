/** @type {import('tailwindcss').Config} */
import tailwindScrollbar from "tailwind-scrollbar";

const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [tailwindScrollbar],
};

export default config;
