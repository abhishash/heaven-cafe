'use client';

import { mockOrders } from '@/lib/mockData';
import { CustomerLayout } from '@/components/customer/CustomerLayout';
import { ArrowLeft, MapPin, Clock, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';

interface OrderDetailsPageProps {
  params: Promise<{ orderId: string }>;
}

export default async function OrderDetailsPage({ params }: OrderDetailsPageProps) {
  const { orderId } = await params;
  const order = mockOrders.find((o) => o.id === orderId);

  if (!order) {
    return (
      <CustomerLayout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <p className="text-center text-muted-foreground text-lg">Order not found</p>
        </div>
      </CustomerLayout>
    );
  }

  const getStatusIcon = () => {
    switch (order.status) {
      case 'delivered':
        return <CheckCircle className="w-8 h-8 text-green-600" />;
      case 'processing':
        return <Clock className="w-8 h-8 text-blue-600" />;
      case 'cancelled':
        return <XCircle className="w-8 h-8 text-red-600" />;
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/customer/orders"
          className="p-2 hover:bg-muted rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-muted-foreground" />
        </Link>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">{order.orderNumber}</h1>
          <p className="text-muted-foreground">Order placed on {new Date(order.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </div>

      {/* Status Section */}
      <div className={`rounded-lg border border-border p-6 mb-8 ${getStatusColor()}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {getStatusIcon()}
            <div>
              <p className="text-sm font-medium opacity-70">Current Status</p>
              <p className="text-xl font-bold capitalize">{order.status}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium opacity-70">Order Date</p>
            <p className="font-semibold">{new Date(order.date).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Order Items */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Order Items</h2>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-3 border-b border-border last:border-b-0">
                <div className="flex-1">
                  <p className="font-medium text-foreground">{item.name}</p>
                  {item.notes && (
                    <p className="text-sm text-muted-foreground italic">{item.notes}</p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">x{item.quantity}</p>
                  <p className="font-semibold text-foreground">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="mt-6 pt-4 border-t border-border">
            <div className="flex justify-between mb-2">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">${(order.total * 0.9).toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-muted-foreground">Delivery Fee</span>
              <span className="font-medium">${(order.total * 0.1).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg">
              <span className="font-bold text-foreground">Total</span>
              <span className="font-bold text-primary">${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Delivery Address */}
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">Delivery Address</h2>
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground text-lg">{order.deliveryAddress.label}</p>
              <p className="text-foreground mt-2">{order.deliveryAddress.street}</p>
              <p className="text-foreground">{order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.zipCode}</p>
              <p className="text-muted-foreground mt-2">{order.deliveryAddress.phoneNumber}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <button className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors">
              Track Order
            </button>
            <button className="w-full border border-border text-foreground py-2 rounded-lg font-medium hover:bg-muted transition-colors">
              Reorder Items
            </button>
          </div>
        </div>
      </div>

      {/* Need Help */}
      <div className="bg-muted rounded-lg border border-border p-6 text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">Need Help?</h3>
        <p className="text-muted-foreground mb-4">Have questions about this order?</p>
        <Link
          href="/customer/support"
          className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          Contact Support
        </Link>
      </div>
    </div>
  );
}
