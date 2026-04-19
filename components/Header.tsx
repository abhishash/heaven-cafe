'use client';


import dynamic from "next/dynamic";

const OrderTypeModal = dynamic(() => import('./pop-up/Order-type-modal'));
const DineDeliveryToggle = dynamic(() => import('./shared/dine-delivery-toggle'));
import Link from 'next/link';
import { MenuIcon, NotebookPen, NotebookTabs, Search, ShoppingCart, User, UserIcon } from 'lucide-react';
import Image from 'next/image';
import { Button } from './ui/button';
import { SearchBar } from './Search-bar';
import { useSession } from 'next-auth/react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import UserCard from './user-card';
import { isObject } from 'framer-motion';
import { useState, useEffect, useRef } from "react";
import { useGetWalletPointQuery } from "@/store/services/wallet-point-api";

export default function Header() {
  const totalItems = useSelector((root: RootState) => root.cart.totalAmount);
  const { data: session } = useSession();
  const [showSearch, setShowSearch] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const lastScrollYRef = useRef(0);

  const lastTriggerYRef = useRef(0);

  useEffect(() => {
    const threshold = 112;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show at top
      if (currentScrollY <= 50) {
        setShowSearch(true);
        lastTriggerYRef.current = currentScrollY;
        lastScrollYRef.current = currentScrollY;
        return;
      }

      const diffFromTrigger = currentScrollY - lastTriggerYRef.current;

      if (diffFromTrigger > threshold) {
        // scrolling down enough
        setShowSearch(false);
        lastTriggerYRef.current = currentScrollY;
      } else if (diffFromTrigger < -threshold) {
        // scrolling up enough
        setShowSearch(true);
        lastTriggerYRef.current = currentScrollY;
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="bg-primary rounded-b-lg shadow-2xl pr-2 fixed top-0 w-full z-50 ">
      {/* Desktop  Navigation */}
      <nav className="container mx-auto pl-0 py-1.5 pr-2 hidden sm:flex items-center justify-between">
        <div className='flex'>
          <Link href="/" className="flex items-center gap-2">
            <div className="text-primary-foreground font-bold text-2xl">
              <Image src="/logo/final-logo.png" className='' priority={true} alt='main-logo' width={140} height={120} />
            </div>
          </Link>
          <DineDeliveryToggle />
        </div>
        <OrderTypeModal />
        <div className="flex items-center gap-4">
          {/* Desktop Search */}
          <div className="hidden md:block w-[400px]">
            <SearchBar placeholder="Search products..." />
          </div>

          <Link href="/menu" className="text-primary-foreground hover:opacity-80 font-medium transition">
            <NotebookPen />
          </Link>

          <UserSection />




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
        <div className="flex items-center justify-between pl-0 pr-0 pb-1 pt-3">

          {/* Logo */}
          <Link href="/">
            <Image
              src="/logo/final-logo.png"
              alt="logo"
              width={140}
              height={70}
              priority
              className="min-w-[140px]"
            />
          </Link>
          {/* Toggle (Dine / Delivery) */}
          <div className="">
            <div className="w-full">
              {/* Your existing toggle */}
              <DineDeliveryToggle />
            </div>
          </div>
        </div>

        <div
          className={`px-2 z-40 transition-[max-height,opacity] duration-300 ${showSearch
              ? "max-h-20 opacity-100 pb-3"
              : "max-h-0 opacity-0 pb-0 pointer-events-none"
            }`}
        >
          <SearchBar placeholder="Search products..." />
        </div>



        {/* ✅ BOTTOM NAV (FIXED) */}
        <div className="sm:hidden fixed bottom-0 left-0 w-full bg-white border-t shadow-lg z-50">
          <div className="flex justify-around items-center py-2">

            {/* Menu */}
            <Link href="/menu" className="flex flex-col items-center text-xs">
              <MenuIcon size={22} />
              Menu
            </Link>

            {/* Cart */}
            <Link href="/cart" className="flex flex-col items-center relative text-xs">
              <ShoppingCart size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-1 right-3 bg-black text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
              Cart
            </Link>

            {/* Profile */}
            {session?.user ? (
              <Link href="/customer/orders" className="flex flex-col items-center text-xs">
                <User size={22} />
                Profile
              </Link>
            ) : (
              <Link href="/login" className="flex flex-col items-center text-xs">
                <User size={22} />
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}




export function UserSection() {
  const { data: session, status } = useSession();

  const isLoggedIn = status === "authenticated" && session?.user;
  const { data, isLoading } = useGetWalletPointQuery(
    undefined,
    { skip: !isLoggedIn }
  );

  return (
    <div className="flex items-center gap-3">

      {/* User Icon */}
      <Link
        href={isLoggedIn ? "/customer/orders" : "/login"}
        className="text-primary-foreground hover:opacity-80 transition"
      >
        <UserIcon size={24} />
      </Link>

      {/* Cart / Count Badge */}
      <div className="relative">
        <h2 className="border py-1.5 font-semibold bg-white text-primary px-2 border-white rounded-md text-sm">
          Wallet Amt: {isLoggedIn ? isLoading ? "0" : data?.points ? parseInt(data?.points.toString()) : "0" : "0"}
        </h2>
      </div>
    </div>
  );
}