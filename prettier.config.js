/** @type {import('prettier').Config} */
module.exports = {
  plugins: ['@trivago/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
  semi: false, // セミコロン無し
  singleQuote: true, // シングルクォート使う
  printWidth: 90, // 折り返し
  tabWidth: 2, // スペースの単位
  trailingComma: 'all', // 行末にカンマつける
  jsxSingleQuote: true, //　JSXでシングルクォートを使用
  importOrder: [
    '^(react/(.*)$)|^(react$)',
    '^(next/(.*)$)|^(next$)',
    '<THIRD_PARTY_MODULES>',
    '',
    '^types$',
    '^@local/(.*)$',
    '^@/config/(.*)$',
    '^@/lib/(.*)$',
    '^@/components/(.*)$',
    '^@/styles/(.*)$',
    '^[./]',
  ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
}
