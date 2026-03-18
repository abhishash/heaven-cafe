"use client";

import { useCallback, useEffect, useState } from "react";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { startCheckoutSession } from "@/app/actions/stripe";
import { CartItem } from "@/lib/types";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

export default function StripeCheckout({
  items,
}: {
  items: CartItem[];
}) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const createCheckoutSession = useCallback(async () => {
    try {
      const secret = await startCheckoutSession(items);
      setClientSecret(secret);
    } catch (error) {
      console.error("Failed to create checkout session:", error);
    }
  }, [items]);

  useEffect(() => {
    createCheckoutSession();
  }, [createCheckoutSession]);

  if (!clientSecret) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-background border-t-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading checkout...</p>
        </div>
      </div>
    );
  }

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{
          clientSecret,
        }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
