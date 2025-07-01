import './globals.css'
import { Inter } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import ErrorBoundary from './components/ErrorBoundary'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: "Duke and Griff's Lemonade Stand",
    template: "%s | Duke and Griff's Lemonade Stand"
  },
  description: 'Fresh, delicious lemonade made with love by Duke and Griff. Order online and pay with Venmo for the perfect refreshing treat.',
  keywords: ['lemonade', 'fresh', 'drinks', 'Duke', 'Griff', 'local business'],
  authors: [{ name: 'Duke and Griff' }],
  creator: 'Duke and Griff',
  metadataBase: new URL('https://duke-griff-lemonade-stand.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://duke-griff-lemonade-stand.vercel.app',
    title: "Duke and Griff's Lemonade Stand",
    description: 'Fresh, delicious lemonade made with love by Duke and Griff.',
    siteName: "Duke and Griff's Lemonade Stand",
    images: [
      {
        url: '/images/duke-griff-logo.png',
        width: 300,
        height: 100,
        alt: "Duke and Griff's Lemonade Stand Logo"
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: "Duke and Griff's Lemonade Stand",
    description: 'Fresh, delicious lemonade made with love by Duke and Griff.',
    images: ['/images/duke-griff-logo.png']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
}

export const viewport: Viewport = {
  themeColor: '#1f5d9dfc',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/lemonade-icon.png" />
        <link rel="apple-touch-icon" href="/images/lemonade-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className={inter.className}>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  )
}