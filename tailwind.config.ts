import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'azul-900': '#1C2A40',
      'azul-500': '#1351B4',
      'azul-200': '#5C7EB5',
      'cinza-500': '#333333',
      'vermelho-500': '#B21D38'
    },
    extend: {
    },
  },
  plugins: [],
}
export default config
