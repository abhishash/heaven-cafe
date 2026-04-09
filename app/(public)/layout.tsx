import type { Metadata } from 'next'
import Header from '@/components/Header'
import { Footer } from '@/components/footer'

export const metadata: Metadata = {
  title: 'FastBite - Fast Food E-Commerce',
  description: 'Order delicious fast food online. Burgers, chicken, sides, and more delivered fast.',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />
      <main className="min-h-screen mt-22 sm:mt-20.5 bg-background">
        {children}
      </main>
      <Footer />
    </>
  )
}
