/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        palette: {
          text: '#000000',  // Adjust this color as needed
          tertiary: '#FFFF00',  // Adjust this color as needed
        },
      },
      boxShadow: {
        'button': '4px 4px 0 0 rgba(0,0,0,1)',
        'buttonHover': '2px 2px 0 0 rgba(0,0,0,1)',
      },
    },
  },
  plugins: [],
}