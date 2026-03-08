# Payment Methods Integration Guide

## Overview

FastBite now supports three payment methods to provide flexibility to customers:

1. **Cash on Delivery (COD)** - Free, no setup required
2. **Stripe** - International payments, credit/debit cards
3. **Razorpay** - Indian and international payments with multiple options

## Quick Comparison

| Feature | COD | Stripe | Razorpay |
|---------|-----|--------|----------|
| Setup Required | No | Yes (API keys) | Yes (API keys) |
| Payment Methods | Cash | Cards only | Cards, UPI, Net Banking, Wallets |
| Geographic Focus | Local | International | India + International |
| Fees | None | ~2.9% + $0.30 | ~2.36% |
| Settlement Time | On Delivery | 1-2 days | 1-2 days |
| Customer Risk | High | Low | Low |
| Best For | Local delivery | US, Europe | India |

## 1. Cash on Delivery (COD)

### How It Works
- Customer selects COD at checkout
- Enters delivery details (name, address, phone, email)
- Order is confirmed immediately
- Payment collected when order is delivered

### Setup
No setup required! Just use it out of the box.

### Features
- ✅ No payment processing fees
- ✅ Works offline
- ✅ Simple customer experience
- ❌ Higher default risk
- ❌ Requires trust with customer

### Testing
1. Go to checkout
2. Select "Cash on Delivery"
3. Fill in delivery details
4. Complete order

### File Location
`/components/CashOnDeliveryForm.tsx`

---

## 2. Stripe Payment

### How It Works
- Customer selects Stripe at checkout
- Enters credit/debit card details in secure Stripe modal
- Payment is processed immediately
- Order confirmation sent to customer

### Setup
Stripe is already configured in the project. Verify these environment variables are set:
```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### Features
- ✅ Secure payment processing
- ✅ PCI compliant
- ✅ Global reach
- ✅ Multiple card types supported
- ❌ Requires internet connection
- ❌ Payment processing fees

### Testing
Use Stripe test card: **4242 4242 4242 4242**
- Expiry: Any future date
- CVC: Any 3 digits

### File Locations
- `/lib/stripe.ts` - Stripe configuration
- `/app/actions/stripe.ts` - Server actions
- `/components/Checkout.tsx` - Stripe checkout component

---

## 3. Razorpay Payment

### How It Works
- Customer selects Razorpay at checkout
- Razorpay checkout modal appears
- Customer selects payment method (card, UPI, net banking, etc.)
- Payment is processed
- Order is confirmed

### Setup
1. Create Razorpay account at https://razorpay.com
2. Get API keys from dashboard
3. Set environment variables:
```
RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=key_secret_here
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_...
```

### Features
- ✅ Multiple payment methods (cards, UPI, wallets)
- ✅ Indian payment focus
- ✅ Lower fees
- ✅ Good mobile experience
- ✅ Supports international cards
- ❌ Primarily for India
- ❌ Requires internet

### Testing
**Test Cards:**
- Visa: `4111 1111 1111 1111`
- Mastercard: `5555 5555 5555 4444`
- Expiry: Any future date
- CVV: Any 3 digits

**Test UPI:**
- Success: `success@razorpay`
- Failure: `fail@razorpay`

### File Locations
- `/lib/razorpay.ts` - Razorpay configuration
- `/app/actions/razorpay.ts` - Server actions
- `/components/RazorpayCheckout.tsx` - Razorpay checkout component

---

## Implementation Details

### Payment Method Selector Component
Located at `/components/PaymentMethodSelector.tsx`

This component allows customers to choose their preferred payment method at checkout.

### Checkout Flow
1. Customer views cart
2. Proceeds to checkout
3. Selects payment method (COD, Stripe, or Razorpay)
4. Provides necessary information
5. Payment is processed
6. Order confirmation page is shown

### Order Confirmation
All payment methods redirect to `/order-confirmation` with:
- Order ID
- Payment method used
- Order details
- Estimated delivery time

---

## Environment Variables Required

### For Development/Testing

```env
# Stripe (optional, already set up)
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Razorpay
RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=key_secret_...
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_...
```

### For Production

Replace all `test` keys with `live` keys from your respective dashboards.

---

## Best Practices

### For COD
1. Implement order verification before delivery
2. Set a maximum COD order limit
3. Require phone verification
4. Keep customer communication strong

### For Stripe
1. Keep STRIPE_SECRET_KEY absolutely private
2. Implement proper error handling
3. Log all payment events
4. Use webhooks for payment status updates

### For Razorpay
1. Keep RAZORPAY_KEY_SECRET absolutely private
2. Validate all payment amounts server-side
3. Store payment IDs for reconciliation
4. Implement webhook handlers for reliability

---

## Switching Between Test and Live Modes

### Test Mode (Development)
- Use test API keys from respective dashboards
- Test cards work as described above
- No real money is charged
- Perfect for development and testing

### Live Mode (Production)
1. Create live API keys in your payment provider dashboard
2. Update environment variables with live keys
3. Test with small amounts first
4. Monitor transactions closely

---

## Troubleshooting

### All Payment Methods
- Check that environment variables are correctly set
- Verify API keys have correct permissions
- Check browser console for errors
- Clear cache and try again

### COD Specific
- Ensure delivery address is valid
- Check that phone number format is correct
- Verify email is reachable

### Stripe Specific
- Verify STRIPE_SECRET_KEY is set server-side only
- Check Stripe account has proper permissions
- Ensure webhook endpoints are configured (if using)

### Razorpay Specific
- Verify both KEY_ID and KEY_SECRET are set
- Check Razorpay account is in live mode (for live keys)
- Ensure test cards are used in test mode
- Check browser console for Razorpay script errors

---

For detailed setup instructions, see:
- [Razorpay Setup Guide](./RAZORPAY_SETUP.md)
