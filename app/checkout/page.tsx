"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  MapPin,
  ReceiptText,
  ShoppingBag,
  Store,
  Truck,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import PaymentMethodSelector from "@/components/PaymentMethodSelector";
import CashOnDeliveryForm, { DeliveryDetails } from "@/components/checkout/CashOnDeliveryForm";
import RazorpayCheckout from "@/components/RazorpayCheckout";
import WalletOnDeliveryForm from "@/components/checkout/WalletOnDeliveryForm";
import CardsList from "@/components/checkout/CardsList";
import EmptyCart from "@/components/cart/empty-cart";
import Spinner from "@/components/shared/spinner";

import { RootState } from "@/lib/redux/store";
import { clearCart } from "@/lib/redux/slice/cartSlice";
import { isArray } from "@/lib/type-guards";
import { formatPrice } from "@/lib/utils";
import { fetchHandler } from "@/lib/fetch-handler";

import { PaymentMethodsResponse } from "@/types/order";
import { useUpdatePaymentStatusMutation } from "@/store/services/order-api";
import MobileFooter from "@/components/shared/layout/mobile-footer";
import { SafeImage } from "@/components/shared/safe-image";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [storedType, setStoredType] = useState<string>("token");

  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session } = useSession();

  /*
   * =========================================
   * ORDER TYPE
   * =========================================
   */

  const isDineIn = useSelector(
    (state: RootState) => state.orderType.isDineIn
  );

  const tableNumber = useSelector(
    (state: RootState) => state.orderType?.tableNumber
  );

  /*
   * =========================================
   * PAYMENT METHOD
   * =========================================
   */

  const normalizedMethod =
    paymentMethod?.trim().toLowerCase() || "";

  const isCOD =
    normalizedMethod === "cod" ||
    normalizedMethod.includes("cash");

  const isWallet = normalizedMethod === "wallet";

  const isStripe = normalizedMethod === "stripe";

  const isCard = normalizedMethod === "card";

  const isRazorpay =
    normalizedMethod !== "" &&
    !isCOD &&
    !isWallet &&
    !isStripe &&
    !isCard;

  /*
   * =========================================
   * LOCAL STORAGE
   * =========================================
   */

  useEffect(() => {
    if (typeof window !== "undefined") {
      const value =
        localStorage.getItem("orderType") ?? "token";

      setStoredType(value);
    }
  }, []);

  /*
   * =========================================
   * CART
   * =========================================
   */

  const {
    items: cart,
    totalPrice,
    delhiveryCharge,
  } = useSelector((state: RootState) => state.cart);

  const deliveryCharge =
    isDineIn ? 0 : Number(delhiveryCharge || 0);

  const grandTotal = totalPrice + deliveryCharge;

  /*
   * =========================================
   * PAYMENT METHODS
   * =========================================
   */

  const {
    data,
    isPending: isPaymentMethodsPending,
  } = useQuery<PaymentMethodsResponse>({
    queryKey: ["payment-methods"],
    queryFn: () =>
      fetchHandler({
        endpoint: "payment-methods",
        method: "GET",
        token: session?.user?.accessToken,
      }),
  });

  const paymentMethods = data?.data || [];

  const cardPayments = paymentMethods.filter(
    (method) => method?.name === "card"
  );

  const cards = cardPayments?.[0]?.cards || [];

  /*
   * =========================================
   * PLACE ORDER
   * =========================================
   */

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (orderData: {
      order_type: string;
      table_no?: number;
      payment_method: string;
      card_number?: string;
      payment_id?: string;
    }) =>
      fetchHandler({
        endpoint: "orders",
        method: "POST",
        data: {
          ...orderData,
        },
        token: session?.user?.accessToken,
      }),
  });

  const placeOrder = async (
    paymentMethodName: string,
    details: {
      cardNumber?: string;
      paymentId?: string;
    } = {}
  ) => {
    const response = await mutateAsync({
      order_type: isDineIn ? "token" : "delivery",

      table_no: isDineIn
        ? tableNumber
          ? Number(tableNumber)
          : undefined
        : undefined,

      payment_method: paymentMethodName,

      card_number: details.cardNumber,

      payment_id: details.paymentId,
    });

    if (!response?.order_no) {
      throw new Error(
        response?.message || "Failed to place order"
      );
    }

    dispatch(clearCart());

    return response.order_no as string;
  };

  /*
   * =========================================
   * COD / CARD / WALLET SUBMIT
   * =========================================
   */

  const handleCODSubmit = async (
    details: DeliveryDetails
  ) => {
    try {
      setIsPlacingOrder(true);

      const orderNo = await placeOrder(
        paymentMethod,
        {
          cardNumber: details.card_number,
        }
      );

      const confirmationMethod =
        paymentMethod === "card"
          ? "card"
          : paymentMethod;

      router.push(
        `/order-confirmation?orderId=${orderNo}&method=${confirmationMethod}`
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Error placing order";

      toast.error(message);

      setIsPlacingOrder(false);
    }
  };

  /*
   * =========================================
   * RAZORPAY
   * =========================================
   */

  const [updatePaymentStatus] =
    useUpdatePaymentStatusMutation();

  const handleRazorpaySuccess = async (data: {
    payment_id: string;
    razorpay_order_id: string;
    order_id: string;
    status: "success";
  }) => {
    try {
      setIsPlacingOrder(true);

      await updatePaymentStatus({
        payment_id: data.payment_id,
        order_id: data.order_id,
        status: data.status,
      });

      router.push(
        `/order-confirmation?orderId=${data.order_id}&paymentId=${data.payment_id}&method=${paymentMethod}`
      );
    } catch (error) {
      await updatePaymentStatus({
        payment_id: data.payment_id,
        order_id: data.order_id,
        status: "failed",
      });

      const message =
        error instanceof Error
          ? error.message
          : "Failed to update payment status";

      toast.error(message);

      setIsPlacingOrder(false);
    }
  };

  const handleRazorpayError = (error: string) => {
    console.error("Razorpay error:", error);
    toast.error(error);
  };

  /*
   * =========================================
   * ORDER PLACING OVERLAY
   * =========================================
   */

  if (isPlacingOrder) {
    return (
      <div
        className="
          fixed
          inset-0
          z-[100]
          flex
          items-center
          justify-center
          bg-black/40
          px-4
          backdrop-blur-md
        "
      >
        <div
          className="
            w-full
            max-w-sm
            rounded-3xl
            border
            border-white/20
            bg-white
            p-8
            text-center
            shadow-2xl
          "
        >
          <div
            className="
              mx-auto
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              bg-orange-50
            "
          >
            <Spinner
              width={28}
              height={28}
            />
          </div>

          <h2 className="mt-5 text-lg font-extrabold text-gray-900">
            Placing Your Order
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Please wait while we confirm your order...
          </p>

          <div className="mx-auto mt-5 h-1.5 w-32 overflow-hidden rounded-full bg-gray-100">
            <div className="h-full w-1/2 animate-pulse rounded-full bg-orange-500" />
          </div>
        </div>
      </div>
    );
  }

  /*
   * =========================================
   * EMPTY CART
   * =========================================
   */

  if (!isArray(cart) || cart.length === 0) {
    return <EmptyCart />;
  }

  /*
   * =========================================
   * CHECKOUT UI
   * =========================================
   */

  return (
    <main className="min-h-screen bg-[#fafafa]">
      {/* =========================================
          TOP HEADER
      ========================================== */}

      <header className="border-b fixed z-10 top-0 w-full border-gray-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between">

            <Link
              href="/cart"
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-gray-200
                bg-white
                px-3
                py-2
                text-xs
                font-semibold
                text-gray-600
                transition
                hover:border-orange-200
                hover:bg-orange-50
                hover:text-orange-600
                sm:text-sm
              "
            >
              <ArrowLeft size={16} />

              Back to Cart
            </Link>

            <div className="flex items-center gap-2">
              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  bg-orange-500
                  text-white
                  shadow-sm
                "
              >
                <ShoppingBag size={17} />
              </div>

              <div className="hidden sm:block">
                <p className="text-sm font-extrabold text-gray-900">
                  Heaven Cafe
                </p>

                <p className="text-[10px] font-medium text-gray-400">
                  Fresh • Delicious • Made for you
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto mt-16 max-w-6xl px-3 py-6 sm:px-6 sm:py-10">

        {/* =========================================
            PAGE TITLE
        ========================================== */}

        <div className="mb-6 sm:mb-8">
          <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-orange-500">
            Heaven Cafe
          </p>

          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
            Complete Your Order
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Choose your payment method and place your order.
          </p>
        </div>

        {/* =========================================
            ORDER TYPE
        ========================================== */}

        <div
          className="
            mb-6
            rounded-2xl
            border
            border-orange-100
            bg-orange-50/70
            p-4
            sm:mb-8
          "
        >
          <div className="flex items-center gap-3">

            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-white
                text-orange-500
                shadow-sm
              "
            >
              {isDineIn ? (
                <Store size={19} />
              ) : (
                <Truck size={19} />
              )}
            </div>

            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wide text-orange-500">
                Order Type
              </p>

              <p className="text-sm font-extrabold text-gray-900">
                {isDineIn
                  ? "Dine In"
                  : "Home Delivery"}
              </p>

              {isDineIn && tableNumber && (
                <p className="mt-0.5 text-xs text-gray-500">
                  Table #{tableNumber}
                </p>
              )}

              {!isDineIn && (
                <p className="mt-0.5 text-xs text-gray-500">
                  Your order will be delivered to you.
                </p>
              )}
            </div>

            <div className="ml-auto hidden sm:block">
              <span
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  rounded-full
                  bg-white
                  px-3
                  py-1.5
                  text-xs
                  font-bold
                  text-orange-600
                  shadow-sm
                "
              >
                <CheckCircle2 size={14} />
                Ready to order
              </span>
            </div>
          </div>
        </div>

        {/* =========================================
            MAIN GRID
        ========================================== */}

        <div className="grid gap-6 lg:grid-cols-3 lg:items-start lg:gap-8">

          {/* =======================================
              LEFT / PAYMENT
          ======================================== */}

          <div className="space-y-5 lg:col-span-2">

            {/* Payment Method */}
            <section
              className="
                overflow-hidden
                rounded-2xl
                border
                border-gray-100
                bg-white
                shadow-[0_5px_25px_rgba(0,0,0,0.04)]
                sm:rounded-3xl
              "
            >
              <div className="p-4 sm:p-6">
                <PaymentMethodSelector
                  onSelectPayment={setPaymentMethod}
                  isLoading={isPaymentMethodsPending}
                  paymentMethods={paymentMethods}
                />
              </div>
            </section>

            {/* Payment Details */}
            {paymentMethod && (
              <section
                className="
                  overflow-hidden
                  rounded-2xl
                  border
                  border-gray-100
                  bg-white
                  shadow-[0_5px_25px_rgba(0,0,0,0.04)]
                  sm:rounded-3xl
                "
              >
                <div className="border-b border-gray-100 px-4 py-4 sm:px-6 sm:py-5">
                  <div className="flex items-center gap-3">

                    <div
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        bg-green-50
                        text-green-600
                      "
                    >
                      <ReceiptText size={19} />
                    </div>

                    <div>
                      <h2 className="text-base font-extrabold text-gray-900 sm:text-lg">
                        Payment Details
                      </h2>

                      <p className="text-xs text-gray-400 sm:text-sm">
                        Complete your payment securely
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:p-6">

                  {/* COD */}
                  {isCOD && (
                    <CashOnDeliveryForm
                      amount={totalPrice}
                      onSubmit={handleCODSubmit}
                      isLoading={isPending}
                      deliveryPrice={deliveryCharge}
                    />
                  )}

                  {/* Wallet */}
                  {isWallet && (
                    <WalletOnDeliveryForm
                      amount={totalPrice}
                      onSubmit={handleCODSubmit}
                      isLoading={isPending}
                    />
                  )}

                  {/* Razorpay */}
                  {isRazorpay && (
                    <RazorpayCheckout
                      amount={grandTotal}
                      customerEmail={
                        session?.user?.email ??
                        "customer@example.com"
                      }
                      customerName={
                        session?.user?.name ??
                        "Customer"
                      }
                      disabled={isPlacingOrder}
                      onSuccess={handleRazorpaySuccess}
                      onError={handleRazorpayError}
                      paymentMethod={paymentMethod}
                      placeOrder={placeOrder}
                    />
                  )}

                  {/* Card */}
                  {isCard && (
                    <CardsList
                      cards={cards}
                      onAddCard={() => {
                        console.log(
                          "Add card clicked"
                        );
                      }}
                      amount={totalPrice}
                      onSubmit={handleCODSubmit}
                      isLoading={isPending}
                    />
                  )}
                </div>
              </section>
            )}

            {/* Secure Payment Note */}
            <div
              className="
                flex
                items-start
                gap-3
                rounded-2xl
                border
                border-gray-100
                bg-white
                p-4
              "
            >
              <div
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-green-50
                  text-green-600
                "
              >
                <CheckCircle2 size={16} />
              </div>

              <div>
                <p className="text-xs font-bold text-gray-700">
                  Safe & Secure Checkout
                </p>

                <p className="mt-0.5 text-[11px] leading-5 text-gray-400">
                  Your payment information is handled securely.
                  We never store sensitive payment details.
                </p>
              </div>
            </div>
          </div>

          {/* =======================================
              RIGHT / ORDER SUMMARY
          ======================================== */}

          <aside
            className="
              lg:sticky
              lg:top-6
            "
          >
            <section
              className="
                overflow-hidden
                rounded-2xl
                border
                border-gray-100
                bg-white
                shadow-[0_8px_30px_rgba(0,0,0,0.06)]
                sm:rounded-3xl
              "
            >

              {/* Summary Header */}
              <div
                className="
                  border-b
                  border-gray-100
                  bg-gradient-to-r
                  from-orange-50
                  to-white
                  px-4
                  py-5
                  sm:px-5
                "
              >
                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">
                    <div
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        bg-orange-500
                        text-white
                        shadow-sm
                      "
                    >
                      <ShoppingBag size={18} />
                    </div>

                    <div>
                      <h2 className="text-base font-extrabold text-gray-900">
                        Order Summary
                      </h2>

                      <p className="text-xs text-gray-400">
                        {cart.length}{" "}
                        {cart.length === 1
                          ? "item"
                          : "items"}
                      </p>
                    </div>
                  </div>

                  <span
                    className="
                      rounded-full
                      bg-white
                      px-2.5
                      py-1
                      text-[10px]
                      font-bold
                      text-orange-600
                      shadow-sm
                    "
                  >
                    REVIEW
                  </span>
                </div>
              </div>

              {/* Cart Items */}
              <div
                className="
                  max-h-[330px]
                  space-y-3
                  overflow-y-auto
                  p-4
                  sm:p-5
                "
              >
                {cart.map((item) => (
                  <div
                    key={item.cart_id}
                    className="
                      flex
                      gap-3
                      rounded-xl
                      border
                      border-gray-100
                      bg-gray-50/70
                      p-3
                    "
                  >
                    {/* Item Icon */}
                    <div
                      className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        bg-white
                        text-orange-500
                        shadow-sm
                      "
                    >
                      <SafeImage width={160} alt={item?.product_id} src={item?.image} height={160}  />
                    </div>

                    {/* Item Details */}
                    <div className="min-w-0 flex-1">
                      <p className=" text-sm text-wrap font-bold text-gray-800">
                        {item.name}
                      </p>

                      <p className="mt-0.5 text-xs text-gray-400">
                        Qty: {item.qty}
                      </p>
                    </div>

                    {/* Item Price */}
                    <p className="shrink-0 text-sm font-bold text-gray-800">
                      {formatPrice(
                        item?.price,
                        "INR"
                      )}
                    </p>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-gray-100 p-4 sm:p-5">

                <div className="space-y-3">

                  <div className="flex items-center justify-between text-sm">
                    <p className="text-gray-500">
                      Subtotal
                    </p>

                    <p className="font-semibold text-gray-800">
                      {formatPrice(
                        totalPrice,
                        "INR"
                      )}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <p className="text-gray-500">
                      Tax
                    </p>

                    <p className="font-semibold text-gray-800">
                      {formatPrice(0, "INR")}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <p className="flex items-center gap-1.5 text-gray-500">
                      <Truck size={14} />

                      {isDineIn
                        ? "Delivery"
                        : "Delivery"}
                    </p>

                    <p
                      className={`font-semibold ${isDineIn
                        ? "text-green-600"
                        : "text-gray-800"
                        }`}
                    >
                      {isDineIn
                        ? "FREE"
                        : formatPrice(
                          deliveryCharge,
                          "INR"
                        )}
                    </p>
                  </div>
                </div>

                {/* Total */}
                <div
                  className="
                    mt-5
                    rounded-2xl
                    border
                    border-orange-100
                    bg-orange-50
                    p-4
                  "
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-gray-800">
                        Total Amount
                      </p>

                      <p className="mt-0.5 text-[10px] text-gray-400">
                        Inclusive of all applicable charges
                      </p>
                    </div>

                    <p className="text-xl font-extrabold text-orange-600">
                      {formatPrice(
                        grandTotal,
                        "INR"
                      )}
                    </p>
                  </div>
                </div>

                {/* Delivery / Dine In Info */}
                <div className="mt-4 flex items-start gap-2.5">
                  <div
                    className="
                      mt-0.5
                      flex
                      h-7
                      w-7
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-gray-50
                      text-gray-500
                    "
                  >
                    {isDineIn ? (
                      <Store size={14} />
                    ) : (
                      <MapPin size={14} />
                    )}
                  </div>

                  <div>
                    <p className="text-xs font-bold text-gray-700">
                      {isDineIn
                        ? `Dine In${tableNumber
                          ? ` • Table #${tableNumber}`
                          : ""
                        }`
                        : "Home Delivery"}
                    </p>

                    <p className="mt-0.5 text-[11px] leading-4 text-gray-400">
                      {isDineIn
                        ? "Enjoy your meal at Heaven Cafe."
                        : "Your delicious order will be delivered to you."}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </aside>
        </div>

        {/* =========================================
            BOTTOM BRANDING
        ========================================== */}
        <MobileFooter />
      </div>
    </main>
  );
}

