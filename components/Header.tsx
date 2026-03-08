'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import OrderTypeModal from './pop-up/Order-type-modal';
import Image from 'next/image';
import { Button } from './ui/button';
import { SearchBar } from './Search-bar';

export default function Header() {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <header className="bg-primary shadow-lg">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="text-primary-foreground font-bold text-2xl">
            <Image src="/logo/website-logo.png" className='' alt='website-logo' width={160} height={120} />
          </div>
        </Link>
        <OrderTypeModal />
        <div className="flex items-center gap-6">
          {/* Desktop Search */}
          <div className="hidden md:block w-[400px]">
            <SearchBar placeholder="Search products..." />
          </div>
          <Link href="/" className="text-primary-foreground hover:opacity-80 font-medium transition">
            Home
          </Link>
          <Link href="/menu" className="text-primary-foreground hover:opacity-80 font-medium transition">
            Menu
          </Link>
          <Link href="/cart" className="relative">
            <ShoppingCart className="text-primary-foreground hover:opacity-80 transition" size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary-foreground text-primary text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>

      </nav>
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-4 text-balance">
              Fast, Fresh, and Delicious
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Order your favorite fast food items online and get them delivered to your door in minutes.
            </p>
            <Link href="/menu">
              <Button size="lg" className="bg-background !cursor-pointer text-primary hover:bg-muted font-bold">
                Order Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </header>
  );
}
