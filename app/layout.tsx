import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import Header from '@/components/Header'
import QueryProvider from './providers/query-provider'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'FastBite - Fast Food E-Commerce',
  description: 'Order delicious fast food online. Burgers, chicken, sides, and more delivered fast.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <QueryProvider >
          <CartProvider>
            <Header />
            {children}
            <Footer />
          </CartProvider>
        </QueryProvider>
        <Analytics />
      </body>
    </html>
  )
}
