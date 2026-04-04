'use client';

import { ReactNode } from 'react';
import { BottomNavigation } from './BottomNavigation';

interface CustomerLayoutProps {
  children: ReactNode;
}

export function CustomerLayout({ children }: CustomerLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <BottomNavigation />
      <main className="pb-24 md:pb-8 md:pl-64 pt-0">
        {children}
      </main>
    </div>
  );
}
