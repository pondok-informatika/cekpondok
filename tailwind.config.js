/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2382a0',
        secondary: '#65d8b6',
      },
    },
  },
  plugins: [],
};
