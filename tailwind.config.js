/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'game-gray-900': '#202020',
        'game-gray-700': '#24272D',
        'game-gray-600': '#40444C',
        'game-gray-500': '#65686D',
        'game-gray-300': '#AFAFAF',
        'game-white': '#E4E4E4',
      },
    },
  },
  plugins: [],
}
