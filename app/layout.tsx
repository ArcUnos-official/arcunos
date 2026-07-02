import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ArcUnos V3 | AI Operating System',
  description: 'The all-in-one AI platform for everyday work.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="theme-gold">{children}</body>
    </html>
  )
}
