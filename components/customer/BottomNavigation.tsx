'use client';

import Link from 'next/link';
import { redirect, usePathname } from 'next/navigation';
import { ShoppingBag, User, MapPin, MessageCircle, LogOut, Settings, HandCoins, ChevronRight } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { clearCart } from '@/lib/redux/slice/cartSlice';

export function BottomNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  console.log("Session data in BottomNavigation:", session);

  const isActive = (path: string) => {
    return pathname.startsWith(path);
  };

  const handleLogout = async () => {
    setLoading(true);
    await fetch("/api/logout", { method: "POST" })?.then(async (res) => {
      const data = await res.json() as { success: boolean };
      if (data.success) {
        dispatch(clearCart());
        const signOutRes = await signOut({ callbackUrl: "/login", redirect: false });
        console.log("Sign out response:", signOutRes);
        if (signOutRes?.url) {
          router.push("/");
        } else {
          toast.warning("Logout successful, but failed to redirect. Please login again.");
        }
      }
    }).catch((error) => {
      toast.warning("Error logging out:", error);
    }).finally(() => {
      setLoading(false);
    })
  }

  const navItems = [
    { icon: ShoppingBag, label: 'Orders', href: '/customer/orders' },
    { icon: User, label: 'Profile', href: '/customer/profile' },
    { icon: MapPin, label: 'Addresses', href: '/customer/addresses' },
    { icon: HandCoins, label: 'Loyalty', href: '/customer/loyalty-history' },
    { icon: MessageCircle, label: 'Support', href: '/customer/support' },
  ];

  return (
    <>
      {/* Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-sidebar border-t border-border shadow-lg md:hidden z-40">
        <div className="flex justify-around items-center h-20">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${active
                  ? 'text-primary border-t-2 border-primary'
                  : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                <Icon className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Desktop Left Sidebar Navigation */}
      <aside className="hidden md:flex w-84  bg-white dark:bg-sidebar border-r border-border flex-col z-40">
        {/* Logo/Header Section */}
        <div className="px-6 py-0 border-b border-border">
          <div className="flex items-center gap-3">
            <div>
              {/* Logo */}
              <div className=" rounded-xl px-6 py-4 flex items-center gap-6">

                {/* Left Section */}
                <div className="flex flex-col items-center relative">
                  {/* Crown */}
                  <div className="text-yellow-500 text-3xl absolute -top-5">
                    👑
                  </div>

                  {/* Logo */}
                  <div className="bg-primary font-bold flex justify-center items-center h-14 w-14 text-white text-lg px-3 py-2 rounded-full mt-4">
                    AK
                  </div>

                  {/* Ribbon */}
                  <div className="bg-primary font-semibold text-white text-xs px-4 py-1 -mt-2 rounded-xs">
                    Excellence
                  </div>
                </div>

                {/* Middle Section */}
                <div className="flex-1">
                  <h2 className="text-lg capitalize font-bold tracking-wide">
                    {session?.user?.name}
                  </h2>
                  <p className="text-base font-semibold mt-1">
                    7906948573
                  </p>
                </div>

                {/* Right Arrow */}
                <button className='cursor-pointer'>
                  <ChevronRight className="text-gray-500" />
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${active
                    ? 'bg-primary/10 text-primary font-semibold shadow-sm'
                    : 'text-foreground hover:bg-muted hover:text-primary'
                    }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Bottom Actions */}
        <div className="border-t border-border px-4 py-4 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-foreground hover:bg-muted transition-colors">
            <Settings className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-medium">Settings</span>
          </button>
          <button onClick={handleLogout} disabled={loading} className="cursor-pointer w-full flex items-center gap-3 px-4 py-2 rounded-lg text-destructive hover:bg-destructive/10 transition-colors">
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-medium"> {loading ? 'Logging out...' : 'Logout'}</span>
          </button>
        </div>
      </aside>
    </>
  );
}
