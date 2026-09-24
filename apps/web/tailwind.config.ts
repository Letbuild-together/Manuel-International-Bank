/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        bank: {
          50: '#eefaf9',
          100: '#d6f7f1',
          500: '#0f766e',
          600: '#0b5f59',
          700: '#0c4b48',
          900: '#0a2e2d'
        }
      },
      boxShadow: {
        soft: '0 20px 45px rgba(15, 118, 110, 0.12)'
      }
    }
  },
  plugins: []
};
