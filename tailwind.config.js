/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const { nextui } = require('@nextui-org/react');

export default {
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#fe3c72',
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
};
