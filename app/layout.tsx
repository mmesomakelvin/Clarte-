import type { Metadata } from 'next'
import './globals.css'
import CursorTrail from '@/components/CursorTrail'

export const metadata: Metadata = {
  title: 'Clarte - Dental Billing Dashboard',
  description: 'A modern dental office billing management system',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <CursorTrail />
        {children}
      </body>
    </html>
  )
}
