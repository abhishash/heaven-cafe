'use client';

import { useState } from 'react';
import { OrderCard } from '@/components/customer/OrderCard';
import { Filter } from 'lucide-react';
import { useGetOrdersQuery } from '@/store/services/order-api';
import { isArray } from '@/lib/type-guards';
import { ShoppingBag, CheckCircle, PackageCheck, Truck } from "lucide-react";


type FilterStatus = 'all' | 'delivered' | 'processing' | 'cancelled';

export default function OrdersPage() {
  const [filter, setFilter] = useState<FilterStatus>('all');

  const { data, isLoading } = useGetOrdersQuery(filter === "all" ? "" : filter);
  const orders = data?.data;

  const stats = { ...data?.count };

  return (
    <div className="pb-5 sm:pt-0 pt-10 px-4">
      {/* Header */}
      <div className="mb-2">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-1">My Orders</h1>
        <p className="text-muted-foreground">Track and manage all your cafe orders</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5 mb-4">

        {/* Total Orders */}
        <div className="bg-card rounded-xl border border-border p-3 sm:p-4 flex items-start gap-3 hover:shadow-md transition">
          <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
            <ShoppingBag size={18} />
          </div>
          <div>
            <p className="text-xs sm:text-sm text-muted-foreground">Total Orders</p>
            {isLoading ? (
              <p className="text-sm">Loading...</p>
            ) : (
              <p className="text-xl sm:text-2xl font-bold">{data?.total_orders}</p>
            )}
          </div>
        </div>

        {/* Delivered */}
        <div className="bg-card rounded-xl border border-border p-3 sm:p-4 flex items-start gap-3 hover:shadow-md transition">
          <div className="p-2 rounded-lg bg-green-100 text-green-600">
            <CheckCircle size={18} />
          </div>
          <div>
            <p className="text-xs sm:text-sm text-muted-foreground">Delivered</p>
            {isLoading ? (
              <p className="text-sm">Loading...</p>
            ) : (
              <p
                style={{ color: stats.Delivered?.text_color }}
                className="text-xl sm:text-2xl font-bold"
              >
                {stats.Delivered?.total}
              </p>
            )}
          </div>
        </div>

        {/* Confirm Order */}
        <div className="bg-card rounded-xl border border-border p-3 sm:p-4 flex items-start gap-3 hover:shadow-md transition">
          <div className="p-2 rounded-lg bg-yellow-100 text-yellow-600">
            <PackageCheck size={18} />
          </div>
          <div>
            <p className="text-xs sm:text-sm text-muted-foreground">Confirmed</p>
            {isLoading ? (
              <p className="text-sm">Loading...</p>
            ) : (
              <p
                style={{ color: stats?.["Confirm Order"]?.text_color }}
                className="text-xl sm:text-2xl font-bold"
              >
                {stats?.["Confirm Order"]?.total}
              </p>
            )}
          </div>
        </div>

        {/* Shipped */}
        <div className="bg-card rounded-xl border border-border p-3 sm:p-4 flex items-start gap-3 hover:shadow-md transition">
          <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
            <Truck size={18} />
          </div>
          <div>
            <p className="text-xs sm:text-sm text-muted-foreground">Shipped</p>
            {isLoading ? (
              <p className="text-sm">Loading...</p>
            ) : (
              <p
                style={{ color: stats?.shipped?.text_color }}
                className="text-xl sm:text-2xl font-bold"
              >
                {stats?.shipped?.total}
              </p>
            )}
          </div>
        </div>

      </div>

      {/* Filter Section */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-muted-foreground" />
          <p className="font-semibold text-foreground">Filter Orders</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {(['all', 'Delivered', 'Confirm Order', 'Shipped'] as FilterStatus[]).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-2.5 sm:px-4 py-1.5 sm:py-2 cursor-pointer rounded-full text-xs sm:text-sm font-medium transition-colors ${filter === status
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
            >
              {status === 'all' ? 'All Orders' : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      {
        isLoading ? <p>Loading...</p> : <div className="space-y-4 max-h-screen no-scrollbar overflow-y-auto">
          {isArray(orders) ? (
            orders?.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No orders found</p>
            </div>
          )}
        </div>
      }
    </div>
  );
}
