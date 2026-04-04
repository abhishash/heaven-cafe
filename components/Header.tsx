'use client';

import Link from 'next/link';
import { ShoppingCart, User, UserIcon } from 'lucide-react';
import OrderTypeModal from './pop-up/Order-type-modal';
import Image from 'next/image';
import { Button } from './ui/button';
import { SearchBar } from './Search-bar';
import { useSession } from 'next-auth/react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import UserCard from './user-card';
import DineDeliveryToggle from './shared/dine-delivery-toggle';
import { isObject } from 'framer-motion';

export default function Header() {
  const totalItems = useSelector((root: RootState) => root.cart.totalAmount);
  const { data: session } = useSession();

  return (
    <header className="bg-primary shadow-xl fixed w-full top-0 z-40">
      <nav className="container mx-auto pl-0 pr-2 sm:px-4 py-2.5 sm:py-4 flex items-center justify-between">
        <div className='flex'>
          <Link href="/" className="flex items-center gap-2">
            <div className="text-primary-foreground font-bold text-2xl">
              <Image src="/logo/final-logo.png" className='' priority={true} alt='main-logo' width={160} height={120} />
            </div>
          </Link>
          <DineDeliveryToggle />
        </div>
        <OrderTypeModal />
        <div className="flex items-center gap-6">
          {/* Desktop Search */}
          <div className="hidden md:block w-[400px]">
            <SearchBar placeholder="Search products..." />
          </div>

          <Link href="/menu" className="text-primary-foreground hover:opacity-80 font-medium transition">
            Menu
          </Link>
          {
            isObject(session?.user) ? <Link href="/customer/orders" className="text-primary-foreground hover:opacity-80 font-medium transition">
              <UserIcon
                className="text-primary-foreground cursor-pointer hover:opacity-80 transition"
                size={24}
              />
            </Link> : <Link href="/login" className="text-primary-foreground hover:opacity-80 font-medium transition">
              <UserIcon
                className="text-primary-foreground cursor-pointer hover:opacity-80 transition"
                size={24}
              />
            </Link>
          }

          {/* <UserCard /> */}
          <Link href="/cart" className="relative">
            <ShoppingCart className="text-primary-foreground hover:opacity-80 transition" size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary-foreground text-primary text-[11px] sm:text-xs font-bold rounded-full sm:w-6 w-5 h-5 sm:h-6 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>

      </nav>

    </header>
  );
}
