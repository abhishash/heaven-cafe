'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, Clock, Truck, AlertCircle } from 'lucide-react';
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
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-950 mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Order Confirmed!
            </h1>
            <p className="text-lg text-muted-foreground">
              Your order has been successfully placed
            </p>
          </div>

          {/* Order Details Cards */}
          <div className="grid gap-4 mb-8">
            {/* Order ID Card */}
            <Card className="p-6 border border-border bg-card">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Order ID</p>
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
                <div className="flex-1">
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
                <div className="flex-1">
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
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
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

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link href="/" className="block">
              <Button
                size="lg"
                className="w-full bg-primary text-primary-foreground hover:opacity-90 font-semibold"
              >
                Continue Shopping
              </Button>
            </Link>
            <Link href="/menu" className="block">
              <Button
                variant="outline"
                size="lg"
                className="w-full"
              >
                Browse Menu
              </Button>
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
      </main>
    </Suspense>
  );
}
