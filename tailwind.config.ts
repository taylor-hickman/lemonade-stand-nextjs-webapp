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
          text: '#5a4f4f',  
          tertiary: '#FFFF00',
          button: '#ffd700', 
          menu: '#ffffd1',   
          background: '#a8e0e0', 
        },
      },
      boxShadow: {
        'button': '2px 2px 0 0 var(--color-palette-text)',
        'buttonHover': '3px 3px 0 0 var(--color-palette-text)',
      },
    },
  },
  plugins: [],
}