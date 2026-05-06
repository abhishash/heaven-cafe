"use client";

import dynamic from "next/dynamic";

const OrderTypeModal = dynamic(() => import("./pop-up/Order-type-modal"));
const DineDeliveryToggle = dynamic(() => import("./shared/delivery-toggle"));

import Link from "next/link";
import { Bell, Heart, MenuIcon, NotebookPen, ShoppingCart, User, UserIcon, Wallet} from "lucide-react";
import Image from "next/image";
import { SearchBar } from "./Search-bar";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { useState, useEffect, useRef } from "react";
import { useGetWalletPointQuery } from "@/store/services/wallet-point-api";
import { useQuery } from "@tanstack/react-query";
import { fetchHandler } from "@/lib/fetch-handler";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Header() {
  const totalItems = useSelector((root: RootState) => root.cart.totalAmount);
  const { data: session } = useSession();
  const [showSearch, setShowSearch] = useState(true);
  const isMobile = useIsMobile();

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
    <header className="bg-primary shadow-2xl pr-2 fixed top-0 w-full z-50 ">
      {/* Bell Ring Animation CSS */}
      <style>{`
        @keyframes ring {
          0% { transform: rotate(0); }
          10%, 30%, 50%, 70%, 90% { transform: rotate(-15deg); }
          20%, 40%, 60%, 80% { transform: rotate(15deg); }
          100% { transform: rotate(0); }
        }
        .animate-ring {
          animation: ring 2s infinite ease-in-out;
          transform-origin: top center;
        }
      `}</style>
      {/* Desktop  Navigation */}

      <nav className="container mx-auto pl-0 py-1.5 pr-2 hidden sm:flex items-center justify-between">
        {
          !isMobile ? <div className="flex">
            <Link href="/" className="flex items-center gap-2">
              <div className="text-primary-foreground font-bold text-2xl">
                <Image
                  src="/logo/final-logo.png"
                  className=""
                  priority={true}
                  alt="main-logo"
                  width={140}
                  height={120}
                />
              </div>
            </Link>
            <DineDeliveryToggle />
          </div> : null
        }

        <OrderTypeModal />
        <div className="flex items-center gap-4">
          {/* Desktop Search */}
          <div className="hidden md:block w-[400px]">
            <SearchBar placeholder="Search products..." />
          </div>

          <Link
            href="/menu"
            className="text-primary-foreground hover:opacity-80 font-medium transition"
          >
            <NotebookPen />
          </Link>
          
          
          <NotificationBell />
          {/* <UserCard /> */}
          <Link href="/cart" className="relative">
            <ShoppingCart
              className="text-primary-foreground hover:opacity-80 transition"
              size={24}
            />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2.5 border border-white bg-primary text-white shadow-2xl text-[11px] sm:text-xs font-bold rounded-full sm:w-5 w-5 h-5 sm:h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <UserSection />

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
          {
            isMobile ? <div className="">
              <div className="w-full">
                {/* Your existing toggle */}
                <DineDeliveryToggle />
              </div>
            </div> : null
          }

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
            <NotificationBell  isMobile={true} />
            
            {/* Menu */}
            <Link href="/menu" className="flex text-primary flex-col items-center text-xs">
              <MenuIcon size={22} />
              Menu
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="flex flex-col text-primary items-center relative text-xs"
            >
              <ShoppingCart className="text-primary" size={22} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-2 bg-primary text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
              Cart
            </Link>

            {/* Profile */}
            {session?.user ? (
              <Link
                href="/customer/orders"
                className="flex flex-col text-primary items-center text-xs"
              >
                <User size={22} />
                Profile
              </Link>
            ) : (
              <Link
                href="/login"
                className="flex flex-col items-center text-xs"
              >
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
  const { data, isLoading } = useGetWalletPointQuery(undefined, {
    skip: !isLoggedIn,
  });

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
        <h2 className="flex items-center gap-2 border text-nowrap py-1 font-semibold bg-white text-primary px-3 border-white rounded-md text-sm">
          <Wallet size={18} className="text-red-500" />
          :{" "}
          {isLoggedIn
            ? isLoading
              ? "0"
              : data?.points
                ? parseInt(data?.points.toString())
                : "0"
            : "0"}
        </h2>
      </div>
    </div>
  );
}

export function NotificationBell({ isMobile }: { isMobile?: boolean }) {
  const { data: session } = useSession();
  const { data } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => fetchHandler({
      endpoint: 'notifications',
      method: 'GET',
      token: session?.user?.accessToken,
    }),
    enabled: !!session?.user?.accessToken,
  });

  const notificationCount = data?.notifications?.length || 0;

  if (isMobile) {
    return (
      <Link href="/notification" className="flex text-primary flex-col items-center relative text-xs">
        <Bell size={22} className="animate-ring text-primary" />
        {notificationCount > 0 && (
          <span className="absolute -top-1 right-3 bg-primary text-white shadow-2xl text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
            {notificationCount}
          </span>
        )}
        Notification
      </Link>
    );
  }

  return (
    <Link href="/notification" className="relative">
      <Bell className="text-primary-foreground hover:opacity-80 transition animate-ring" size={24} />
      {notificationCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-primary text-white shadow-2xl text-[11px] sm:text-[11px] font-bold rounded-full sm:w-5 w-5 h-5 sm:h-5 flex items-center justify-center border border-white">
          {notificationCount}
        </span>
      )}
    </Link>
  );
}

export function WishlistIcon({ isMobile }: { isMobile?: boolean }) {
  const { data: session } = useSession();
  const { data } = useQuery({
    queryKey: ['wishlist'],
    queryFn: () => fetchHandler({
      endpoint: 'wishlist',
      method: 'GET',
      token: session?.user?.accessToken,
    }),
    enabled: !!session?.user?.accessToken,
  });

  const wishlistCount = data?.data?.length || 0;

  if (isMobile) {
    return (
      <Link href="/wishlist" className="flex flex-col items-center relative text-xs">
        <Heart size={22} />
        {wishlistCount > 0 && (
          <span className="absolute -top-1 right-3 bg-primary text-white shadow-2xl text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
            {wishlistCount}
          </span>
        )}
        Wishlist
      </Link>
    );
  }

  return (
    <Link href="/wishlist" className="relative">
      <Heart className="text-primary-foreground hover:opacity-80 transition" size={24} />
      {wishlistCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-primary text-white shadow-2xl text-[11px] sm:text-xs font-bold rounded-full sm:w-5 w-5 h-5 sm:h-5 flex items-center justify-center border border-white">
          {wishlistCount}
        </span>
      )}
    </Link>
  );
}
