import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import QueryProvider from './providers/query-provider'
import { Toaster } from '@/components/ui/sonner'
import SessionProviders from './providers/session-providers'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import { Geist } from 'next/font/google'
import ReduxProvider from './providers/redux-provider'

const geist = Geist({
  subsets: ['latin'],
})

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
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={`${geist.className} antialiased"`}>
        <SessionProviders session={session}>
          <ReduxProvider>
            <QueryProvider >
              <CartProvider>
                {children}
                <Toaster richColors={true} theme="light" closeButton={true} />
              </CartProvider>
            </QueryProvider>
          </ReduxProvider>
        </SessionProviders>
        <Analytics />
      </body>
    </html>
  )
}
