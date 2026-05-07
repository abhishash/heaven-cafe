import type { Metadata } from 'next'
import Header from '@/components/Header'
import { Footer } from '@/components/footer'
import 'leaflet/dist/leaflet.css';

export const metadata: Metadata = {
  title: 'Heaven Cafe - Fast Food E-Commerce',
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
      <main className="min-h-[calc(100dvh-260px)]  mt-26 sm:mt-13.5 bg-background">
        {children}
      </main>
      <Footer />
    </>
  )
}
