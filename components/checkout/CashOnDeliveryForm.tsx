'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle, Loader2 } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { toast } from 'sonner';

interface CashOnDeliveryFormProps {
  orderId: string;
  amount: number;
  onSubmit: (details: DeliveryDetails) => Promise<void>;
  isLoading?: boolean;
}

export interface DeliveryDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  notes?: string;
  card_number?: string; // For card payments
}

export default function CashOnDeliveryForm({
  orderId,
  amount,
  onSubmit,
  isLoading = false,
}: CashOnDeliveryFormProps) {
  const [formData, setFormData] = useState<DeliveryDetails>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      toast.error('Error submitting form:');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Alert */}
      <div className="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg flex gap-2">
        <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        <p className="text-sm text-blue-700 dark:text-blue-300">
          You will pay <strong>{formatPrice(amount + 20, "INR")}</strong> when your order arrives.
        </p>
      </div>

      {/* Delivery Details */}
      <div className="space-y-4">
        <div className="flex flex-col gap-y-4">
          <label className="text-sm font-medium text-foreground">
            Delivery Notes (Optional)
          </label>
          <Textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Ring the doorbell twice, leave at main entrance, etc."
            className="bg-background"
            disabled={isSubmitting || isLoading}
            rows={2}
          />
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting || isLoading}
        className="w-full bg-primary cursor-pointer text-primary-foreground hover:opacity-90 font-semibold"
      >
        {isSubmitting || isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Placing Order...
          </>
        ) : (
          'Place Order'
        )}
      </Button>
    </form>
  );
}
