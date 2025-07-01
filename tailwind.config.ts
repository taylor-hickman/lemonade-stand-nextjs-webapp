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
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      animation: {
        slideIn: 'slideIn 0.3s ease-out',
      },
      padding: {
        'safe': 'env(safe-area-inset-bottom)',
      },
    },
  },
  plugins: [],
}

export default config