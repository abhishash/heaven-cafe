# FastBite Payment System - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Verify Installation
Your FastBite e-commerce platform already has all three payment methods integrated:

- ✅ **Cash on Delivery** - Ready to use (no setup)
- ✅ **Stripe** - Ready to use (already configured)
- ⏳ **Razorpay** - Waiting for API keys

### Step 2: Test Without Razorpay
You can immediately test COD and Stripe:

```bash
# 1. Start your dev server
npm run dev

# 2. Open browser to http://localhost:3000

# 3. Add items to cart

# 4. Go to checkout

# 5. Try each payment method:
# - COD: Fill address and submit
# - Stripe: Use test card 4242 4242 4242 4242
```

### Step 3: Set Up Razorpay (Optional)

#### Get Your API Keys:
1. Sign up at https://razorpay.com
2. Go to Dashboard → Settings → API Keys
3. Copy your Key ID and Key Secret

#### Add to Your Project:
In your project settings (Vercel), add these environment variables:

```
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=key_secret_xxxxx
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxx
```

Then Razorpay will be active immediately!

### Step 4: Test All Payment Methods

#### Test COD (Cash on Delivery)
```
1. Add items to cart
2. Click Checkout
3. Select "Cash on Delivery"
4. Fill in delivery details:
   - Name: Test User
   - Email: test@example.com
   - Phone: +1234567890
   - Address: 123 Test St, City, State 12345
5. Click "Place Order"
6. See confirmation page
```

#### Test Stripe
```
1. Add items to cart
2. Click Checkout
3. Select "Stripe"
4. Enter test card: 4242 4242 4242 4242
5. Expiry: Any future date
6. CVC: Any 3 digits
7. Click Pay
8. See confirmation page
```

#### Test Razorpay (After Setting Up)
```
1. Add items to cart
2. Click Checkout
3. Select "Razorpay"
4. Razorpay modal appears
5. Enter test card or UPI:
   - Card: 4111 1111 1111 1111
   - UPI: success@razorpay
6. Complete payment
7. See confirmation page
```

## 📝 Payment Method Details

### Cash on Delivery
- **Best for**: Local deliveries, building trust
- **Setup**: 0 minutes
- **Fees**: None
- **Risks**: Payment not guaranteed until delivery
- **Form fields**: Name, Email, Phone, Address

### Stripe
- **Best for**: International customers, online trust
- **Setup**: Already done!
- **Fees**: 2.9% + $0.30 per transaction
- **Risks**: Low (PCI compliant)
- **Test Card**: 4242 4242 4242 4242

### Razorpay
- **Best for**: Indian customers, multiple payment options
- **Setup**: 5 minutes
- **Fees**: 2.36% per transaction
- **Risks**: Low (secure checkout)
- **Test Cards**: Multiple options (see RAZORPAY_SETUP.md)

## 🔧 File Locations for Customization

### If You Want to Customize...

**Payment Method Selector UI**
→ `/components/PaymentMethodSelector.tsx`

**COD Form Fields**
→ `/components/CashOnDeliveryForm.tsx`

**Razorpay Integration**
→ `/components/RazorpayCheckout.tsx`
→ `/lib/razorpay.ts`
→ `/app/actions/razorpay.ts`

**Checkout Page**
→ `/app/checkout/page.tsx`

**Order Confirmation Page**
→ `/app/order-confirmation/page.tsx`

**Cart Context** (for cart management)
→ `/context/CartContext.tsx`

## ⚙️ Configuration Reference

### Current Payment Methods
```typescript
type PaymentMethod = 'cod' | 'stripe' | 'razorpay';
```

### Environment Variables
```
// Stripe (already configured)
STRIPE_SECRET_KEY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

// Razorpay (add these)
RAZORPAY_KEY_ID
RAZORPAY_KEY_SECRET
NEXT_PUBLIC_RAZORPAY_KEY_ID
```

## 🐛 Troubleshooting

### "Payment Method Not Appearing"
- Clear browser cache (Ctrl+Shift+Delete)
- Restart dev server
- Check console for errors (F12)

### "Can't Submit Payment"
- Verify all form fields are filled
- For Razorpay: Check API keys are set
- Check browser console for errors

### "Order Not Confirmed"
- Check that payment was successful
- Look at browser console for errors
- Check network tab in DevTools

### "Environment Variables Not Working"
- Restart your dev server after adding vars
- Check that variable names are exact (case-sensitive)
- Use `NEXT_PUBLIC_` prefix for client-side vars

## 📊 What Happens After Payment

1. **COD**: Order saved, customer notified, payment collected at delivery
2. **Stripe**: Order saved, payment verified, customer notified
3. **Razorpay**: Order saved, payment verified, customer notified

All lead to: `/order-confirmation` page with order details

## 🎯 Next Steps

1. **Test COD & Stripe** right now (no setup needed)
2. **Add Razorpay keys** (5 minutes setup)
3. **Test all three** payment methods
4. **Customize** forms and UI to match your brand
5. **Add order database** to store orders permanently
6. **Set up admin dashboard** to manage orders
7. **Deploy to production** with live API keys

## 💡 Pro Tips

- COD works best for **local/same-day delivery**
- Stripe is great for **international customers**
- Razorpay is best for **Indian market penetration**
- Offer all three for **maximum conversion**
- Test thoroughly before going live
- Use test keys during development
- Switch to live keys only when ready for real payments

## 🔐 Security Checklist

- [ ] Never commit API keys to Git
- [ ] Use environment variables for all secrets
- [ ] Keep server secrets server-side only
- [ ] Validate amounts on the server
- [ ] Use HTTPS in production
- [ ] Implement webhook verification
- [ ] Log payment events for auditing
- [ ] Review payment provider security docs

## 📞 Need Help?

- **Razorpay Support**: https://support.razorpay.com
- **Stripe Support**: https://support.stripe.com
- **Our Guides**: See other markdown files in project root

---

**You're ready to go!** Start testing now and let us know if you need any customizations.
