/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#6366f1', // From the purple color in the gradient
          dark: '#a855f7',  // From the blue color in the gradient
        },
        dark: '#111827',    // Dark background color
        light: '#f9fafb',   // Light text color
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}