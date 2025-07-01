import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        palette: {
          text: '#002868',  
          tertiary: '#FFFF00',
          button: '#DC143C', 
          menu: '#FFE4E1',   
          background: '#1f5d9dfc', 
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

export default config