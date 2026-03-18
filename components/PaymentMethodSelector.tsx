'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CheckCircle, DollarSign, CreditCard, IndianRupee } from 'lucide-react';

type PaymentMethod = 'cod' | 'stripe' | 'razorpay';

interface PaymentMethodSelectorProps {
  onSelectPayment: (method: PaymentMethod) => void;
  isLoading?: boolean;
}

export default function PaymentMethodSelector({
  onSelectPayment,
  isLoading = false,
}: PaymentMethodSelectorProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('cod');

  const methods = [
    {
      id: 'cod' as PaymentMethod,
      name: 'Cash on Delivery',
      description: 'Pay when your order arrives',
      icon: IndianRupee,
      badge: 'No Extra Cost',
    },
    {
      id: 'stripe' as PaymentMethod,
      name: 'Credit/Debit Card',
      description: 'Pay securely with Stripe',
      icon: CreditCard,
      badge: 'Instant',
    },
    {
      id: 'razorpay' as PaymentMethod,
      name: 'Razorpay',
      description: 'Pay with UPI, cards, and more',
      icon: CreditCard,
      badge: 'Multiple Options',
    },
  ];

  const handleSelect = (method: PaymentMethod) => {
    setSelectedMethod(method);
    onSelectPayment(method);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-foreground">Select Payment Method</h2>
      <div className="grid grid-cols-1 gap-4">
        {methods.map((method) => {
          const IconComponent = method.icon;
          const isSelected = selectedMethod === method.id;

          return (
            <Card
              key={method.id}
              className={`p-4 cursor-pointer transition-all border-2 ${
                isSelected
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => handleSelect(method.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="mt-1">
                    <IconComponent
                      size={24}
                      className={`${
                        isSelected ? 'text-primary' : 'text-muted-foreground'
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground text-lg">
                      {method.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {method.description}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-xs font-semibold bg-secondary text-secondary-foreground px-2 py-1 rounded">
                    {method.badge}
                  </span>
                  {isSelected && <CheckCircle size={24} className="text-primary" />}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
