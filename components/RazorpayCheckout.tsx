'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { createRazorpayOrder, verifyRazorpayPayment } from '@/app/actions/razorpay';
import { formatPrice } from '@/lib/utils';

interface RazorpayCheckoutProps {
  amount: number;
  customerEmail: string;
  customerName: string;
  disabled?: boolean;
  onSuccess: (paymentId: string) => void;
  onError: (error: string) => void;
}

export default function RazorpayCheckout({
  amount,
  customerEmail,
  customerName,
  disabled = false,
  onSuccess,
  onError,
}: RazorpayCheckoutProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    // Load Razorpay script
    if (!window.Razorpay) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => {
        scriptLoaded.current = true;
      };
      script.onerror = () => {
        setError('Failed to load Razorpay. Please refresh and try again.');
      };
      document.body.appendChild(script);
    } else {
      scriptLoaded.current = true;
    }
  }, []);

  const handlePayment = async () => {
    if (!scriptLoaded.current) {
      const message = 'Razorpay is not loaded. Please refresh and try again.';
      setError(message);
      onError(message);
      return;
    }

    if (!process.env.RAZORPAY_KEY_ID) {
      const message = 'Razorpay public key is not configured.';
      setError(message);
      onError(message);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Create order on server
      const orderResponse = await createRazorpayOrder({
        amount,
        orderId: "123",
        customerEmail,
        customerName,
      });

      if (!orderResponse.success) {
        const message = orderResponse.error || 'Failed to create order';
        setError(message);
        onError(message);
        setIsLoading(false);
        return;
      }

      // Open Razorpay checkout
      const options = {
        key: process.env.RAZORPAY_KEY_ID,
        order_id: orderResponse.orderId,
        amount: orderResponse.amount,
        currency: orderResponse.currency,
        name: 'Heaven Cafe',
        description: `Order #${"1231"}`,
        customer_notification: 1,
        prefill: {
          name: customerName,
          email: customerEmail,
        },
        handler: async (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) => {
          // Verify payment on server
          const verifyResponse = await verifyRazorpayPayment({
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          });

          if (verifyResponse.success) {
            onSuccess(response.razorpay_payment_id);
          } else {
            const message = verifyResponse.error || 'Payment verification failed';
            setError(message);
            onError(message);
          }
          setIsLoading(false);
        },
        modal: {
          ondismiss: () => {
            setIsLoading(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      onError(errorMessage);
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="p-3 bg-destructive/10 border border-destructive rounded-lg">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      <Button
        onClick={handlePayment}
        disabled={isLoading || disabled}
        size="lg"
        className="w-full bg-primary text-primary-foreground hover:opacity-90 font-semibold"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          `Place Order & Pay ${formatPrice(amount, "INR")}`
        )}
      </Button>
    </div>
  );
}

// Type declaration for Razorpay
declare global {
  interface Window {
    Razorpay: any;
  }
}
