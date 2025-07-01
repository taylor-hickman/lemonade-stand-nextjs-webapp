# Lemonade Stand Web App

Next.js web application for Duke and Griff's Lemonade Stand with Venmo payment integration.

## Features

- Interactive menu with quantity tracking
- Venmo payment integration (web and mobile app support)
- Responsive design optimized for mobile devices
- SEO optimization with Open Graph metadata
- Error boundaries and graceful error handling
- TypeScript for type safety

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- Vercel deployment ready

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/taylor-hickman/lemonade-stand-nextjs-webapp.git
cd lemonade-stand-nextjs-webapp
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Venmo username:
```
NEXT_PUBLIC_VENMO_USERNAME=your-venmo-username
```

4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run analyze` - Analyze bundle size

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_VENMO_USERNAME` | Venmo username for payments | Yes |
| `NEXT_PUBLIC_PAYMENT_DESCRIPTION` | Custom payment description | No |

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Manual Deployment

```bash
npm run build
npm run start
```

## Project Structure

```
├── app/
│   ├── components/
│   │   ├── ErrorBoundary.tsx
│   │   └── LemonadeStand.tsx
│   ├── utils/
│   │   ├── menuItems.ts
│   │   └── venmo.ts
│   ├── globals.css
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── page.tsx
│   └── types.ts
├── public/
│   └── images/
└── package.json
```

## Configuration

- **TypeScript**: Configured with strict mode
- **ESLint**: Next.js recommended rules
- **Tailwind CSS**: Custom color palette and design system
- **Security**: Headers configured in `next.config.mjs`