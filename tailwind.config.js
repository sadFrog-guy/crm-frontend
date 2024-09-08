import {nextui} from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ['Sapporo', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        ubuntu: ['Ubuntu', 'sans-serif'],
      },
      colors: {
        deutschYellow: '#FDCC03'
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}
