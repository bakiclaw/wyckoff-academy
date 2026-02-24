import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Wyckoff Academy | Learn Trading',
  description: 'Interactive platform for mastering the Wyckoff Trading Methodology',
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
