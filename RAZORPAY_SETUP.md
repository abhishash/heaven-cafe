# Razorpay Integration Setup Guide

## Overview
This FastBite e-commerce application now supports Razorpay payments alongside Cash on Delivery and Stripe. Follow these steps to set up Razorpay.

## Prerequisites
- A Razorpay business account (sign up at https://razorpay.com)
- Your Razorpay API credentials

## Step-by-Step Setup

### 1. Create a Razorpay Account
- Visit https://razorpay.com and sign up for a business account
- Complete the KYC verification process
- Once verified, you'll have access to your dashboard

### 2. Get Your API Keys
1. Log in to your Razorpay Dashboard
2. Navigate to **Settings → API Keys**
3. You'll see two keys:
   - **Key ID** (public key)
   - **Key Secret** (private key - keep this secure!)

### 3. Add Environment Variables
The following environment variables have been set up in your project:

```
RAZORPAY_KEY_ID=your_key_id_here
RAZORPAY_KEY_SECRET=your_key_secret_here
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_key_id_here
```

**Important:** 
- Keep `RAZORPAY_KEY_SECRET` secure and never expose it in client-side code
- `RAZORPAY_KEY_ID` can be public (prefixed with NEXT_PUBLIC_)

### 4. Test Mode vs Live Mode
- **Test Mode**: Use test API keys to test payments
  - Test Card: 4111 1111 1111 1111
  - Any future date for expiry
  - Any CVC number
  
- **Live Mode**: Replace test keys with live keys when ready for production

### 5. How Payments Work

#### Razorpay Payment Flow:
1. Customer selects Razorpay as payment method
2. Order is created on Razorpay server
3. Customer enters payment details in Razorpay checkout modal
4. Payment is processed securely
5. Razorpay sends confirmation back to your app
6. Order is confirmed and saved

## Payment Methods Available

### 1. Cash on Delivery (COD)
- No setup required
- Customer pays when order is delivered
- Perfect for local deliveries

### 2. Stripe
- Already integrated
- Requires Stripe API keys
- Best for international payments

### 3. Razorpay
- Indian and international payments
- Multiple payment options (cards, UPI, net banking, wallets)
- Best for Indian customers

## Testing Razorpay Integration

### Test Cards:
| Card Type | Card Number | Expiry | CVV |
|-----------|-------------|--------|-----|
| Visa | 4111111111111111 | Any future date | Any 3 digits |
| Mastercard | 5555555555554444 | Any future date | Any 3 digits |
| American Express | 378282246310005 | Any future date | Any 4 digits |

### Test UPI:
- UPI ID: success@razorpay (for success)
- UPI ID: fail@razorpay (for failure)

## Webhook Setup (Optional but Recommended)

For production, set up webhooks to handle payment events:

1. Go to Razorpay Dashboard → Settings → Webhooks
2. Add endpoint: `https://yourdomain.com/api/razorpay-webhook`
3. Subscribe to events:
   - `payment.authorized`
   - `payment.failed`
   - `payment.captured`

## Troubleshooting

### "Payment Gateway Error"
- Verify API keys are correctly set in environment variables
- Check that you're using the correct mode (test vs live)
- Ensure NEXT_PUBLIC_RAZORPAY_KEY_ID is set

### "Order Creation Failed"
- Check your server logs for detailed error messages
- Verify the amount is in the correct format (in paise, e.g., 1000 = ₹10)
- Ensure all required fields are provided

### "Payment Modal Not Appearing"
- Check browser console for errors
- Verify Razorpay script is loaded
- Clear browser cache and try again

## File Structure

```
/app/actions/razorpay.ts - Server actions for Razorpay
/lib/razorpay.ts - Razorpay configuration
/components/RazorpayCheckout.tsx - Razorpay checkout component
/components/PaymentMethodSelector.tsx - Payment method selection
/components/CashOnDeliveryForm.tsx - COD form
```

## Support

- Razorpay Support: https://support.razorpay.com
- Documentation: https://razorpay.com/docs
- Dashboard: https://dashboard.razorpay.com

## Security Best Practices

1. Never commit API keys to version control
2. Use environment variables for all sensitive data
3. Keep RAZORPAY_KEY_SECRET server-side only
4. Validate all payment amounts on the server
5. Implement proper error handling
6. Log payment events for auditing

---

Once you've added your Razorpay API keys to the environment variables, the payment system is ready to use!
