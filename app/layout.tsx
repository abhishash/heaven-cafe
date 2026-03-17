import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import QueryProvider from './providers/query-provider'
import { Toaster } from '@/components/ui/sonner'
import SessionProviders from './providers/session-providers'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import { Geist } from 'next/font/google'
import ReduxProvider from './providers/redux-provider'
import CartProvider from '@/context/CartProvider'

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
        url: '/favicon.png',
        media: '(prefers-color-scheme: light)',
      }
    ],
    apple: '/favicon.png',
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
