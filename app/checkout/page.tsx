"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PaymentMethodSelector from "@/components/PaymentMethodSelector";
// import { Checkout as StripeCheckout } from '@/components/Checkout';
import CashOnDeliveryForm, {
  DeliveryDetails,
} from "@/components/CashOnDeliveryForm";
import RazorpayCheckout from "@/components/RazorpayCheckout";
import Checkout from "@/components/Checkout";
import { useDispatch } from "react-redux";

type PaymentMethod = "cod" | "stripe" | "razorpay";

export default function CheckoutPage() {
  const { } = useDispatch();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(
    null,
  );
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = 3;
  const deliveryFee = 5;
  const finalTotal = subtotal + deliveryFee;
  const orderId = `ORD-${Date.now()}`;

  const handleCODSubmit = async (details: DeliveryDetails) => {
    setIsProcessing(true);
    try {
      // Simulate order placement
      await new Promise((resolve) => setTimeout(resolve, 1000));

   

      // clearCart();
      router.push(`/order-confirmation?orderId=${orderId}&method=cod`);
    } catch (error) {
      console.error("Error placing order:", error);
    } finally {
      setIsProcessing(false);
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

  // if (cart.length === 0) {
  //   return (
  //     <main className="min-h-screen bg-background">
  //       <div className="container mx-auto px-4 py-8">
  //         <Link
  //           href="/cart"
  //           className="inline-flex items-center gap-2 text-primary hover:underline mb-8"
  //         >
  //           <ArrowLeft className="w-4 h-4" />
  //           Back to Cart
  //         </Link>

  //         <div className="text-center py-12">
  //           <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
  //           <p className="text-muted-foreground mb-6">
  //             Add items to your cart before checking out
  //           </p>
  //           <Link
  //             href="/menu"
  //             className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition"
  //           >
  //             Continue Shopping
  //           </Link>
  //         </div>
  //       </div>
  //     </main>
  //   );
  // }

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
                isLoading={isProcessing}
              />
            </div>

            {/* Payment Specific Forms */}
            {paymentMethod && (
              <div className="bg-card rounded-lg p-6 border border-border">
                {paymentMethod === "cod" && (
                  <CashOnDeliveryForm
                    orderId={orderId}
                    amount={finalTotal}
                    onSubmit={handleCODSubmit}
                    isLoading={isProcessing}
                  />
                )}

                {/* {paymentMethod === "stripe" && (
                  // <StripeCheckout onSuccess={handleStripeSuccess} />
                  <Checkout onSuccess={handleStripeSuccess} />
                )} */}

                {paymentMethod === "razorpay" && (
                  <RazorpayCheckout
                    orderId={orderId}
                    amount={finalTotal}
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
              {/* {cart.map((item) => (
                <div
                  key={item.productId}
                  className="flex justify-between text-sm"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-muted-foreground">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))} */}
            </div>
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between mb-2">
                <p className="text-muted-foreground">Subtotal</p>
                <p className="font-medium">${subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="text-muted-foreground">Delivery</p>
                <p className="font-medium">${deliveryFee.toFixed(2)}</p>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t text-primary">
                <p>Total</p>
                <p>${finalTotal.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
