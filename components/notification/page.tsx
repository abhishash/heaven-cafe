"use client";

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchHandler } from '@/lib/fetch-handler';
import { useSession } from 'next-auth/react';

interface Notification {
  id: number;
  title: string;
  description: string;
}

export default function NotificationsPage() {
  const { data: session } = useSession();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => fetchHandler({
      endpoint: 'notifications',
      method: 'GET',
      token: session?.user?.accessToken,
    }),
    enabled: !!session?.user?.accessToken,
  });

  const notifications: Notification[] = data?.notifications || [];

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Notifications</h1>
      <div className="flex flex-col space-y-4">
        {isLoading ? (
          <div className="p-8 text-center text-gray-500">Loading notifications...</div>
        ) : isError ? (
          <div className="p-8 text-center text-red-500">Failed to load notifications.</div>
        ) : notifications.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No notifications found.</div>
        ) : (
          notifications.map((notification) => (
          <div
            key={notification.id}
            className="p-5 rounded-xl border transition-all bg-white border-gray-200 shadow-sm"
          >
            <div className="flex justify-between items-start mb-2">
              <h2 className="font-semibold text-lg text-gray-800">
                {notification.title}
              </h2>
            </div>
            <p className="text-gray-600">
              {notification.description}
            </p>
          </div>
          ))
        )}
      </div>
    </div>
  );
}