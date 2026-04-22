'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, DollarSign, CreditCard, IndianRupee } from 'lucide-react';
import { fetchHandler } from '@/lib/fetch-handler';
import { useQuery } from '@tanstack/react-query';
import { PaymentMethod, PaymentMethodsResponse } from '@/types/order';
import PaymentMethodsSkeleton from './checkout/placehoder/PaymentMethodsSkeleton';
import { LucideIcon } from 'lucide-react';
import { isArray } from '@/lib/type-guards';


interface PaymentMethodSelectorProps {
  onSelectPayment: (method: string) => void;
  isLoading?: boolean;
  paymentMethods?: PaymentMethod[];
}

export default function PaymentMethodSelector({
  onSelectPayment,
  isLoading = false,
  paymentMethods,
}: PaymentMethodSelectorProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>('');

  useEffect(() => {
    if (paymentMethods && isArray(paymentMethods) && paymentMethods.length > 0 && !selectedMethod) {
      const firstActive = paymentMethods.find((m) => m.status === 1);
      if (firstActive) {
        setSelectedMethod(firstActive.name);
        onSelectPayment(firstActive.name);
      }
    }
  }, [paymentMethods, selectedMethod, onSelectPayment]);



  const handleSelect = (method: string) => {
    setSelectedMethod(method);
    onSelectPayment(method);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-foreground">Select Payment Method</h2>
      {
        isLoading ? (
          <PaymentMethodsSkeleton />
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {!isArray(paymentMethods) ? "Not Found Methods" : paymentMethods?.map((method) => {
              const isSelected = selectedMethod === method.name;
              const isActive = method.status === 1;

              return (
                <Card
                  key={method.id}
                  className={`p-4 transition-all border-2 ${isActive
                    ? isSelected
                      ? "border-primary bg-primary/5 cursor-pointer"
                      : "border-border hover:border-primary/50 cursor-pointer"
                    : "border-border bg-gray-100 opacity-60 cursor-not-allowed"
                    }`}
                  onClick={() => {
                    if (isActive) handleSelect(method.name);
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground text-lg">
                          {method.label}
                        </h3>

                        <p className="text-sm text-muted-foreground mt-1">
                          {method.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      {/* Badge */}
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded ${isActive
                          ? "bg-secondary text-secondary-foreground"
                          : "bg-gray-300 text-gray-600"
                          }`}
                      >
                        {isActive ? method.badge : "Unavailable"}
                      </span>

                      {/* Selected Icon */}
                      {isActive && isSelected && (
                        <CheckCircle size={24} className="text-primary" />
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )
      }

    </div>
  );
}
