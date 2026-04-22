"use client";

import { useQuery } from '@tanstack/react-query';
import { fetchHandler } from '@/lib/fetch-handler';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Bell } from 'lucide-react';

export default function NotificationBadge() {
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

  return (
    <Link href="/notification" className="relative inline-flex items-center p-2 cursor-pointer">
      <Bell className="w-6 h-6 text-gray-700 hover:text-orange-500 transition-colors" />
      {notificationCount > 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full">
          {notificationCount}
        </span>
      )}
    </Link>
  );
}