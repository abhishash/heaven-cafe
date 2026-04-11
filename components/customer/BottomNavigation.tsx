'use client';

import Link from 'next/link';
import { redirect, usePathname } from 'next/navigation';
import { ShoppingBag, User, MapPin, MessageCircle, LogOut, Settings } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export function BottomNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const isActive = (path: string) => {
    return pathname.startsWith(path);
  };

  const handleLogout = async () => {
    setLoading(true);
    await fetch("/api/logout", { method: "POST" })?.then(async (res) => {
      const data = await res.json() as { success: boolean };
      if (data.success) {
        const signOutRes = await signOut({ callbackUrl: "/login", redirect: false });
        console.log("Sign out response:", signOutRes);
        if (signOutRes?.url) {
          router.push("/login");
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
    { icon: MessageCircle, label: 'Support', href: '/customer/support' },
  ];

  return (
    <>
      {/* Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0  bg-white dark:bg-sidebar border-t border-border shadow-lg md:hidden z-40">
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
      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 bg-white dark:bg-sidebar border-r border-border flex-col z-40">
        {/* Logo/Header Section */}
        <div className="px-6 py-8 border-b border-border">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">CafeHub</h1>
              <p className="text-xs text-muted-foreground">Customer Portal</p>
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
