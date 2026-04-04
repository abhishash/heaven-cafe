'use client';

import Link from 'next/link';
import { Order } from '@/lib/mockData';
import { ChevronRight, Clock, CheckCircle, XCircle } from 'lucide-react';

interface OrderCardProps {
  order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
  const getStatusIcon = () => {
    switch (order.status) {
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'processing':
        return <Clock className="w-5 h-5 text-blue-600" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-600" />;
    }
  };

  const getStatusText = () => {
    switch (order.status) {
      case 'delivered':
        return 'Delivered';
      case 'processing':
        return 'Processing';
      case 'cancelled':
        return 'Cancelled';
    }
  };

  const getStatusColor = () => {
    switch (order.status) {
      case 'delivered':
        return 'bg-green-50 text-green-700';
      case 'processing':
        return 'bg-blue-50 text-blue-700';
      case 'cancelled':
        return 'bg-red-50 text-red-700';
    }
  };

  return (
    <Link href={`/customer/orders/${order.id}`}>
      <div className="bg-card rounded-lg border border-border p-4 hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">{order.orderNumber}</p>
            <p className="text-sm text-muted-foreground">{new Date(order.date).toLocaleDateString()}</p>
          </div>
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${getStatusColor()}`}>
            {getStatusIcon()}
            <span className="text-xs font-medium">{getStatusText()}</span>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm text-muted-foreground mb-2">Items:</p>
          <div className="flex flex-wrap gap-1">
            {order.items.slice(0, 2).map((item) => (
              <span key={item.id} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                {item.name} x{item.quantity}
              </span>
            ))}
            {order.items.length > 2 && (
              <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                +{order.items.length - 2} more
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Total</p>
            <p className="text-lg font-bold text-foreground">${order.total.toFixed(2)}</p>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </div>
      </div>
    </Link>
  );
}
