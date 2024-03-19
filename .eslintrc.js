/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  plugins: ['tailwindcss'],
  extends: ['next/core-web-vitals', 'prettier', 'plugin:tailwindcss/recommended'],
}
