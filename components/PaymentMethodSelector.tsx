"use client";

import { useEffect, useState } from "react";
import {
  Banknote,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  CreditCard,
  Wallet,
} from "lucide-react";

import { PaymentMethod } from "@/types/order";
import PaymentMethodsSkeleton from "./checkout/placehoder/PaymentMethodsSkeleton";
import { isArray } from "@/lib/type-guards";

interface PaymentMethodSelectorProps {
  onSelectPayment: (method: string) => void;
  isLoading?: boolean;
  paymentMethods?: PaymentMethod[];
}

export default function PaymentMethodSelector({
  onSelectPayment,
  isLoading = false,
  paymentMethods = [],
}: PaymentMethodSelectorProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>("");

  useEffect(() => {
    if (
      isArray(paymentMethods) &&
      paymentMethods.length > 0 &&
      !selectedMethod
    ) {
      const firstActive = paymentMethods.find(
        (method) => method.status === 1
      );

      if (firstActive) {
        setSelectedMethod(firstActive.name);
        onSelectPayment(firstActive.name);
      }
    }
  }, [paymentMethods, selectedMethod, onSelectPayment]);

  const handleSelect = (method: PaymentMethod) => {
    if (method.status !== 1) return;

    setSelectedMethod(method.name);
    onSelectPayment(method.name);
  };

  const getPaymentIcon = (name: string) => {
    const method = name.toLowerCase();

    if (method.includes("cash") || method.includes("cod")) {
      return Banknote;
    }

    if (method.includes("wallet")) {
      return Wallet;
    }

    if (
      method.includes("card") ||
      method.includes("stripe") ||
      method.includes("razorpay")
    ) {
      return CreditCard;
    }

    return CircleDollarSign;
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <PaymentMethodsSkeleton />
      </div>
    );
  }

  if (!isArray(paymentMethods) || paymentMethods.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-5 py-10 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-50 text-orange-500">
          <CreditCard size={24} strokeWidth={1.8} />
        </div>

        <h3 className="mt-4 text-base font-bold text-gray-800">
          No Payment Methods
        </h3>

        <p className="mx-auto mt-1 max-w-sm text-xs leading-5 text-gray-400">
          There are currently no payment methods available for this order.
        </p>
      </div>
    );
  }

  return (
    <section className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-extrabold tracking-tight text-gray-900 sm:text-xl">
            Select Payment Method
          </h2>

          <p className="mt-1 text-xs text-gray-400 sm:text-sm">
            Choose your preferred way to pay
          </p>
        </div>

        <div className="hidden items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-green-600 sm:flex">
          <CheckCircle2 size={13} />
          Secure
        </div>
      </div>

      {/* Payment Methods */}
      <div className="space-y-3">
        {paymentMethods.map((method) => {
          const isSelected = selectedMethod === method.name;
          const isActive = method.status === 1;
          const Icon = getPaymentIcon(method.name);

          return (
            <button
              key={method.id}
              type="button"
              disabled={!isActive}
              onClick={() => handleSelect(method)}
              aria-pressed={isSelected}
              className={`
                group relative w-full overflow-hidden rounded-2xl border
                p-4 text-left outline-none transition-all duration-200
                sm:p-5
                ${
                  isActive
                    ? isSelected
                      ? "border-orange-400 bg-orange-50/70 shadow-[0_8px_25px_rgba(249,115,22,0.10)]"
                      : "border-gray-100 bg-white hover:border-orange-200 hover:bg-orange-50/30 hover:shadow-md"
                    : "cursor-not-allowed border-gray-100 bg-gray-50 opacity-55"
                }
              `}
            >
              {/* Selected top accent */}
              {isSelected && isActive && (
                <div className="absolute inset-x-0 top-0 h-0.5 bg-orange-500" />
              )}

              <div className="flex items-center gap-3 sm:gap-4">

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3
                      className={`
                        text-sm font-bold sm:text-base
                        ${
                          isActive
                            ? "text-gray-900"
                            : "text-gray-500"
                        }
                      `}
                    >
                      {method.label}
                    </h3>

                    {/* Badge */}
                    <span
                      className={`
                        rounded-full px-2 py-0.5 text-[9px]
                        font-bold uppercase tracking-wide
                        ${
                          isActive
                            ? isSelected
                              ? "bg-orange-100 text-orange-600"
                              : "bg-green-50 text-green-600"
                            : "bg-gray-200 text-gray-500"
                        }
                      `}
                    >
                      {isActive
                        ? method.badge || "Available"
                        : "Unavailable"}
                    </span>
                  </div>

                  {/* Description */}
                  {method.description && (
                    <p className="mt-1 line-clamp-2 text-xs leading-5 text-gray-400 sm:text-sm">
                      {method.description}
                    </p>
                  )}
                </div>

                {/* Right side */}
                <div className="shrink-0">
                  {isSelected && isActive ? (
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-500 text-white shadow-sm">
                      <Check size={15} strokeWidth={3} />
                    </div>
                  ) : isActive ? (
                    <ChevronRight
                      size={19}
                      className="text-gray-300 transition-all duration-200 group-hover:translate-x-1 group-hover:text-orange-400"
                    />
                  ) : (
                    <span className="text-[10px] font-semibold text-gray-400">
                      Disabled
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>      
    </section>
  );
}
