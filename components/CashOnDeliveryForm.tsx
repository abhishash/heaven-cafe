'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { AlertCircle, Loader2 } from 'lucide-react';

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

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Invalid email format';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, '')))
      newErrors.phone = 'Phone must be 10 digits';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Order Info */}
      <Card className="p-4 bg-secondary/30 border-0">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">Order ID</p>
            <p className="font-semibold text-foreground">{orderId}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Total Amount</p>
            <p className="text-2xl font-bold text-primary">₹{(amount * 100).toLocaleString()}</p>
          </div>
        </div>
      </Card>

      {/* Alert */}
      <div className="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg flex gap-2">
        <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-blue-700 dark:text-blue-300">
          You will pay <strong>₹{(amount * 100).toLocaleString()}</strong> when your order arrives.
        </p>
      </div>

      {/* Delivery Details */}
      <div className="space-y-4">
        <h3 className="font-semibold text-foreground">Delivery Details</h3>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Full Name *
          </label>
          <Input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="John Doe"
            className="bg-background"
            disabled={isSubmitting || isLoading}
          />
          {errors.fullName && (
            <p className="text-xs text-destructive">{errors.fullName}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Email *
          </label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className="bg-background"
            disabled={isSubmitting || isLoading}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Phone Number *
          </label>
          <Input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="9876543210"
            className="bg-background"
            disabled={isSubmitting || isLoading}
          />
          {errors.phone && (
            <p className="text-xs text-destructive">{errors.phone}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Street Address *
          </label>
          <Textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="123 Main St, Apartment 4B"
            className="bg-background"
            disabled={isSubmitting || isLoading}
            rows={2}
          />
          {errors.address && (
            <p className="text-xs text-destructive">{errors.address}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              City *
            </label>
            <Input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="New York"
              className="bg-background"
              disabled={isSubmitting || isLoading}
            />
            {errors.city && (
              <p className="text-xs text-destructive">{errors.city}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Postal Code *
            </label>
            <Input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              placeholder="10001"
              className="bg-background"
              disabled={isSubmitting || isLoading}
            />
            {errors.postalCode && (
              <p className="text-xs text-destructive">{errors.postalCode}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
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
        className="w-full bg-primary text-primary-foreground hover:opacity-90 font-semibold"
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
