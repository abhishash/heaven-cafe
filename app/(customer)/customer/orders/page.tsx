'use client';

import { useState } from 'react';
import { mockOrders } from '@/lib/mockData';
import { CustomerLayout } from '@/components/customer/CustomerLayout';
import { OrderCard } from '@/components/customer/OrderCard';
import { Filter } from 'lucide-react';
import { useGetOrdersQuery } from '@/store/services/order-api';
import orders from 'razorpay/dist/types/orders';
import { isArray } from '@/lib/type-guards';

type FilterStatus = 'all' | 'delivered' | 'processing' | 'cancelled';

export default function OrdersPage() {
  const [filter, setFilter] = useState<FilterStatus>('all');

  const filteredOrders =
    filter === 'all'
      ? mockOrders
      : mockOrders.filter((order) => order.status === filter);

  const { data, isLoading } = useGetOrdersQuery();

  const stats = {
    total: mockOrders.length,
    delivered: mockOrders.filter((o) => o.status === 'delivered').length,
    processing: mockOrders.filter((o) => o.status === 'processing').length,
  };

  return (
    <CustomerLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">My Orders</h1>
          <p className="text-muted-foreground">Track and manage all your cafe orders</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-card rounded-lg border border-border p-4">
            <p className="text-sm text-muted-foreground mb-1">Total Orders</p>
            <p className="text-2xl font-bold text-foreground">{stats.total}</p>
          </div>
          <div className="bg-card rounded-lg border border-border p-4">
            <p className="text-sm text-muted-foreground mb-1">Delivered</p>
            <p className="text-2xl font-bold text-green-600">{stats.delivered}</p>
          </div>
          <div className="bg-card rounded-lg border border-border p-4">
            <p className="text-sm text-muted-foreground mb-1">In Progress</p>
            <p className="text-2xl font-bold text-blue-600">{stats.processing}</p>
          </div>
        </div>

        {/* Filter Section */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <p className="font-semibold text-foreground">Filter Orders</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {(['all', 'delivered', 'processing', 'cancelled'] as FilterStatus[]).map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === status
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
          isLoading ? <p>Loading...</p> : <div className="space-y-4">
            {isArray(data) ? (
              data?.map((order) => (
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
    </CustomerLayout>
  );
}
