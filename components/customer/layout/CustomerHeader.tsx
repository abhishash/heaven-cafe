'use client';

import dynamic from "next/dynamic";
import Link from 'next/link';
import { BookOpenCheck, MenuIcon, Search, ShoppingCart, User, UserIcon } from 'lucide-react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { isObject } from 'framer-motion';
import { useState } from "react";
import { SearchBar } from "@/components/Search-bar";

export default function CustomerHeader() {
  const totalItems = useSelector((root: RootState) => root.cart.totalAmount);
  const { data: session } = useSession();
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="bg-linear-to-b from-primary from-40%  to-secondary fixed top-0 w-full z-50 ">
      {/* Desktop  Navigation */}
      <nav className="container mx-auto pl-0 pr-2 sm:px-4 py-2.5 sm:py-4 hidden sm:flex items-center justify-between">
        <div className='flex'>
          <Link href="/" className="flex items-center gap-2">
            <div className="text-primary-foreground font-bold text-2xl">
              <Image src="/logo/final-logo.png" className='' priority={true} alt='main-logo' width={160} height={120} />
            </div>
          </Link>
        </div>
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
      {/* Mobile Navigation */}
      {/* ✅ TOP NAV */}
      <div className="sm:hidden sticky top-0  shadow-sm">

        {/* Top Row */}
        <div className="flex items-center justify-between pl-2 pr-4 pb-1 pt-3">

          {/* Logo */}
          <Link href="/">
            <Image
              src="/logo/final-logo.png"
              alt="logo"
              width={140}
              height={70}
              priority
            />
          </Link>
          <div className="flex gap-x-4">

            <Link href="/menu" className="flex flex-col items-center text-xs">
              <BookOpenCheck className="text-white size-6" size={22} />
            </Link>

            {/* Cart */}
            <Link href="/cart" className="flex flex-col items-center relative text-xs">
              <ShoppingCart className="text-white size-6" size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-1 right-3 bg-black text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
            {/* Search Icon */}
            <button onClick={() => setShowSearch(!showSearch)}>
              <Search className="text-white size-6" size={22} />
            </button>
          </div>

        </div>
        {/* Expandable Search */}
        {showSearch && (
          <div className="px-4 pb-3">
            <input
              type="text"
              placeholder="Search food, dishes..."
              className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        )}
      </div>
    </header>
  );
}
