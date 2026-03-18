'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, Clock, Truck, AlertCircle, ChefHat, Home, MapPin } from 'lucide-react';
import { Suspense } from 'react';

export default function OrderPage() {

  return (
    <Suspense fallback={<>Loading...</>}>
      <OrderConfirmationPage />
    </Suspense>
  );
}


function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const method = searchParams.get('method') || 'unknown';
  const paymentId = searchParams.get('paymentId');

  const getPaymentMethodDisplay = (method: string) => {
    switch (method) {
      case 'cod':
        return {
          name: 'Cash on Delivery',
          description: 'Pay when your order arrives',
          icon: Clock,
          color: 'text-blue-600',
        };
      case 'stripe':
        return {
          name: 'Credit/Debit Card',
          description: 'Paid via Stripe',
          icon: CheckCircle,
          color: 'text-green-600',
        };
      case 'razorpay':
        return {
          name: 'Razorpay',
          description: 'Payment completed',
          icon: CheckCircle,
          color: 'text-green-600',
        };
      default:
        return {
          name: 'Unknown',
          description: 'Payment method not specified',
          icon: AlertCircle,
          color: 'text-gray-600',
        };
    }
  };

  const paymentInfo = getPaymentMethodDisplay(method);
  const IconComponent = paymentInfo.icon;

  return (
    <Suspense fallback={<>Loading...</>}>
      <main className="min-h-screen bg-background py-8 px-4">

        {/* Decorative burger elements */}
        <div className="absolute top-10 left-10 text-6xl opacity-20 animate-bounce" style={{ animationDelay: '0s' }}>
          🍔
        </div>
        <div className="absolute top-32 right-20 text-5xl opacity-20 animate-bounce" style={{ animationDelay: '0.5s' }}>
          🍟
        </div>
        <div className="absolute bottom-20 left-20 text-6xl opacity-20 animate-bounce" style={{ animationDelay: '1s' }}>
          🌮
        </div>
        <div className="absolute bottom-32 right-10 text-5xl opacity-20 animate-bounce" style={{ animationDelay: '1.5s' }}>
          🍕
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-2xl mx-auto text-center">
            {/* 404 Error Code */}
            <div className="mb-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-36 h-36 rounded-full bg-green-100 dark:bg-green-950 mb-4">
                  <CheckCircle className="w-24 h-24 text-green-600" />
                </div>
                <h1 className="text-4xl font-bold text-foreground mb-2">
                  Order Confirmed!
                </h1>
                <p className="text-lg text-muted-foreground">
                  Your order has been successfully placed
                </p>
              </div>
            </div>


            {/* Order Details Cards */}
            <div className="grid items-start gap-4 mb-8">
              {/* Order ID Card */}
              <Card className="p-6 border border-border bg-card">
                <div className="space-y-4">
                  <div className='text-start'>
                    <p className="text-sm text-start text-muted-foreground mb-1">Order ID</p>
                    <p className="text-2xl font-bold text-foreground font-mono">
                      {orderId || 'N/A'}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Payment Method Card */}
              <Card className="p-6 border border-border bg-card">
                <div className="flex items-start gap-4">
                  <div className={`mt-1 ${paymentInfo.color}`}>
                    <IconComponent size={28} />
                  </div>
                  <div className="flex-1 text-start">
                    <p className="text-sm text-muted-foreground">Payment Method</p>
                    <h3 className="text-xl font-semibold text-foreground mb-1">
                      {paymentInfo.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {paymentInfo.description}
                    </p>
                    {paymentId && (
                      <p className="text-xs text-muted-foreground mt-2 font-mono">
                        Transaction ID: {paymentId}
                      </p>
                    )}
                  </div>
                </div>
              </Card>

              {/* Delivery Information */}
              <Card className="p-6 border border-border bg-card">
                <div className="flex items-start gap-4">
                  <div className="text-primary mt-1">
                    <Truck size={28} />
                  </div>
                  <div className="flex-1 text-start">
                    <p className="text-sm text-muted-foreground">Estimated Delivery</p>
                    <h3 className="text-xl font-semibold text-foreground mb-1">
                      30-45 minutes
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {method === 'cod'
                        ? 'Please have the exact amount ready for payment upon delivery'
                        : 'Your order will arrive shortly'}
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Additional Information */}
            {method === 'cod' && (
              <Card className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 mb-8">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <div className="text-start">
                    <p className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                      Cash on Delivery
                    </p>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Our delivery partner will contact you before arriving. Please keep your phone nearby and have the exact amount ready.
                    </p>
                  </div>
                </div>
              </Card>
            )}


            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-linear-to-r from-primary to-secondary text-white font-bold rounded-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-base sm:text-lg"
              >
                <Home className="w-5 h-5" />
                Continue Shopping
              </Link>
              <Link
                href="/menu"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-primary text-primary font-bold rounded-full hover:bg-primary hover:text-white transition-all duration-300 text-base sm:text-lg"
              >
                <MapPin className="w-5 h-5" />
                View Menu
              </Link>
            </div>

            {/* Support Info */}
            <div className="mt-8 pt-8 border-t border-border text-center">
              <p className="text-sm text-muted-foreground mb-2">
                Need help with your order?
              </p>
              <p className="text-sm">
                <a href="mailto:support@fastbite.com" className="text-primary hover:underline">
                  Contact Support
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>

    </Suspense>
  );
}
