"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PaymentMethodSelector from "@/components/PaymentMethodSelector";
import CashOnDeliveryForm, {
  DeliveryDetails,
} from "@/components/CashOnDeliveryForm";
import RazorpayCheckout from "@/components/RazorpayCheckout";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import { isArray } from "@/lib/type-guards";
import EmptyCart from "@/components/cart/empty-cart";
import { formatPrice } from "@/lib/utils";
import Checkout from "@/components/stripe-checkout";
import StripeCheckout from "@/components/stripe-checkout";
import { fetchHandler } from "@/lib/fetch-handler";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { clearCart } from "@/lib/redux/slice/cartSlice";

type PaymentMethod = "cod" | "stripe" | "razorpay";

export default function CheckoutPage() {
  const { } = useDispatch();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(
    "cod",
  );
  const { items: cart, totalPrice } = useSelector((state: RootState) => state.cart);

  const orderId = `ORD-${Date.now()}XXXXXX`;
  const { data: session } = useSession();
  const dispatch = useDispatch();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: () =>
      fetchHandler({
        endpoint: "orders",
        method: "POST",
        data: {},
        token: session?.user?.accessToken,
      })
  });

  const handleCODSubmit = async (details: DeliveryDetails) => {
    try {
      // Simulate order placement
      const response = await mutateAsync();
      dispatch(clearCart());
      router.push(`/order-confirmation?orderId=${response?.order_no}&method=cod`);
    } catch (error) {
      toast.error("Error placing order");
    }
  };

  const handleStripeSuccess = () => {
    // clearCart();
    router.push(`/order-confirmation?orderId=${orderId}&method=stripe`);
  };

  const handleRazorpaySuccess = (paymentId: string) => {
    // clearCart();
    router.push(
      `/order-confirmation?orderId=${orderId}&paymentId=${paymentId}&method=razorpay`,
    );
  };

  const handleRazorpayError = (error: string) => {
    console.error("Razorpay error:", error);
  };

  if (!isArray(cart)) {
    return (
      <EmptyCart />
    );
  }

  return (
    <main className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-primary hover:underline mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Cart
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Payment Method Selection */}
            <div className="bg-card rounded-lg p-6 border border-border">
              <PaymentMethodSelector
                onSelectPayment={setPaymentMethod}
                isLoading={isPending}
              />

            </div>
            {/* Payment Specific Forms */}
            {paymentMethod && (
              <div className="bg-card rounded-lg p-6 border border-border">
                {paymentMethod === "cod" && (
                  <CashOnDeliveryForm
                    orderId={orderId}
                    amount={totalPrice}
                    onSubmit={handleCODSubmit}
                    isLoading={isPending}
                  />
                )}

                {paymentMethod === "stripe" && (
                  <StripeCheckout items={cart} />
                )}

                {paymentMethod === "razorpay" && (
                  <RazorpayCheckout
                    orderId={orderId}
                    amount={totalPrice + 20}
                    customerEmail="customer@example.com"
                    customerName="Customer"
                    onSuccess={handleRazorpaySuccess}
                    onError={handleRazorpayError}
                  />
                )}
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-card rounded-lg p-6 h-fit sticky top-24 border border-border">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
              {cart.map((item) => (
                <div
                  key={item.cart_id}
                  className="flex justify-between text-sm"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-muted-foreground">
                      Qty: {item.qty}
                    </p>
                  </div>
                  <p className="font-medium">
                    {formatPrice(item?.price, "INR")}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between mb-2">
                <p className="text-muted-foreground">Subtotal</p>
                <p className="font-medium">{formatPrice(totalPrice, "INR")}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="text-muted-foreground">Tax</p>
                <p className="font-medium">{formatPrice(0, "INR")}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="text-muted-foreground">Delivery</p>
                <p className="font-medium">{formatPrice(20, "INR")}</p>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t text-primary">
                <p>Total</p>
                <p>{formatPrice(totalPrice + 20, "INR")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
