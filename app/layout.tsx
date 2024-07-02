import './globals.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Knox's Lemonade Stand",
  description: 'A refreshing lemonade stand by Knox',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}