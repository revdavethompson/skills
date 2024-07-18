import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '2': 'repeat(2, minmax(0, 1fr))',
        '3': 'repeat(3, minmax(0, 1fr))',
        '4': 'repeat(4, minmax(0, 1fr))',
        '5': 'repeat(5, minmax(0, 1fr))',
        '6': 'repeat(6, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
};

export default config;
