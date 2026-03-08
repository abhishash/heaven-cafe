# Payment System Testing Checklist

## Pre-Testing Setup
- [ ] Dev server is running (`npm run dev`)
- [ ] Browser is open to `http://localhost:3000`
- [ ] Browser console is open (F12)
- [ ] Network tab in DevTools is available to monitor requests

## Cash on Delivery (COD) Testing

### Basic Flow
- [ ] Add 1 item to cart
- [ ] Click "View Cart"
- [ ] Click "Checkout"
- [ ] Select "Cash on Delivery" payment method
- [ ] Form appears for delivery details

### Form Validation
- [ ] Try submitting empty form - should show validation errors
- [ ] Enter invalid email - should show error
- [ ] Enter invalid phone (too short) - should show error
- [ ] Enter all valid details
- [ ] Form should be enabled for submission

### Order Placement
- [ ] Click "Place Order"
- [ ] See loading state
- [ ] Redirected to order confirmation page
- [ ] Order ID is displayed
- [ ] "Cash on Delivery" is shown as payment method
- [ ] Cart is cleared (check by navigating to cart)

### Test Data
```
Name: Test Customer
Email: test@example.com
Phone: +1234567890
Address: 123 Test Street, New York, NY 10001
```

---

## Stripe Testing

### Payment Method Selection
- [ ] Stripe option appears in payment selector
- [ ] Can click to select Stripe
- [ ] Stripe form appears after selection

### Card Processing
- [ ] Test Card: `4242 4242 4242 4242`
- [ ] Expiry: 12/25 (any future date)
- [ ] CVC: 123 (any 3 digits)
- [ ] Cardholder Name: TEST
- [ ] ZIP: 10001 (any valid)

### Payment Flow
- [ ] Can fill card details
- [ ] Click "Pay" button
- [ ] Modal shows loading
- [ ] Payment processes successfully
- [ ] Redirected to order confirmation
- [ ] Order shows "Stripe" as payment method
- [ ] Cart is cleared

### Error Testing (Optional)
- [ ] Test Card: `4000 0000 0000 0002` (should decline)
- [ ] Empty fields (should show validation)
- [ ] Invalid dates (should show error)

---

## Razorpay Testing

### Prerequisites
- [ ] RAZORPAY_KEY_ID is set in environment variables
- [ ] RAZORPAY_KEY_SECRET is set
- [ ] NEXT_PUBLIC_RAZORPAY_KEY_ID is set
- [ ] Dev server has been restarted after adding keys

### Payment Method Selection
- [ ] Razorpay option appears in payment selector
- [ ] Can click to select Razorpay
- [ ] "Initialize Payment" button appears

### Razorpay Modal
- [ ] Click "Initialize Payment"
- [ ] Razorpay checkout modal appears
- [ ] Modal shows order amount
- [ ] Modal shows multiple payment options

### Card Payment
- [ ] Select "Card" in Razorpay modal
- [ ] Enter test card: `4111 1111 1111 1111`
- [ ] Expiry: Any future date (e.g., 12/25)
- [ ] CVV: Any 3 digits
- [ ] Cardholder name: TEST
- [ ] Click "Pay"
- [ ] Payment processes
- [ ] Redirected to order confirmation
- [ ] Order shows "Razorpay" as payment method

### UPI Payment (Test)
- [ ] In Razorpay modal, select UPI option
- [ ] Enter UPI ID: `success@razorpay`
- [ ] Click "Pay"
- [ ] Payment succeeds
- [ ] Redirected to confirmation

### Failure Testing
- [ ] UPI ID: `fail@razorpay` (should fail gracefully)
- [ ] Error message is displayed
- [ ] Option to retry is available

---

## Cart & Order Management

### Before Checkout
- [ ] Add 3 different items to cart
- [ ] Cart counter shows correct number
- [ ] Cart page shows all items
- [ ] Total price is correct

### During Checkout
- [ ] Order summary shows all items
- [ ] Prices are correct
- [ ] Delivery fee is added ($5.00)
- [ ] Total includes delivery fee
- [ ] Each item shows correct quantity

### After Payment
- [ ] Cart is empty after successful payment
- [ ] Cart counter resets to 0
- [ ] Cart page shows "empty" message

---

## Order Confirmation Page

### Display Elements
- [ ] Page title: "Order Confirmed!"
- [ ] Order ID is displayed
- [ ] Order date is shown
- [ ] Payment method is displayed correctly
- [ ] "Payment: Cash on Delivery" / "Stripe" / "Razorpay"
- [ ] Order amount is shown
- [ ] Estimated delivery time is shown

### Navigation
- [ ] "Continue Shopping" button works
- [ ] Takes user back to home page
- [ ] Cart remains empty

---

## Edge Cases & Error Handling

### Empty Cart
- [ ] Go to checkout with empty cart
- [ ] See "cart is empty" message
- [ ] Cannot proceed to payment

### Network Errors
- [ ] Disconnect internet during payment (offline)
- [ ] See appropriate error message
- [ ] Can retry when online

### Multiple Orders
- [ ] Place order #1 with COD
- [ ] Confirm and clear cart
- [ ] Place order #2 with Stripe
- [ ] Confirm and clear cart
- [ ] Place order #3 with Razorpay
- [ ] Each has unique Order ID

### Browser Back Button
- [ ] After confirmation, click browser back
- [ ] Should not go back to checkout with payment info
- [ ] Cart should remain empty

---

## Performance & UI

### Loading States
- [ ] COD form disables submit while processing
- [ ] Stripe shows loading during payment
- [ ] Razorpay shows loading during payment
- [ ] Buttons show disabled state appropriately

### Responsive Design (Mobile)
- [ ] Test on mobile screen (Chrome DevTools)
- [ ] Layout is responsive
- [ ] Payment forms are readable
- [ ] Buttons are clickable
- [ ] No horizontal scrolling

### Form Styling
- [ ] Form fields are clearly visible
- [ ] Error messages are visible and red
- [ ] Success messages are visible and green
- [ ] Labels are clear and associated with inputs

---

## Browser Compatibility

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari
- [ ] Mobile Chrome

---

## Security Checks

- [ ] API keys not visible in client console
- [ ] No sensitive data in localStorage
- [ ] HTTPS is used in production
- [ ] No payment details logged to console
- [ ] Form data is not logged publicly

---

## Final Sign-Off

### All Tests Pass?
- [ ] COD works end-to-end
- [ ] Stripe works end-to-end
- [ ] Razorpay works end-to-end
- [ ] All edge cases handled
- [ ] UI is responsive
- [ ] No console errors

### Ready for Production?
- [ ] All test keys verified
- [ ] Error messages are user-friendly
- [ ] Order confirmation is clear
- [ ] Security measures are in place
- [ ] Documentation is complete

---

## Test Results Summary

| Payment Method | Status | Notes |
|---------------|--------|-------|
| Cash on Delivery | ✅/❌ | |
| Stripe | ✅/❌ | |
| Razorpay | ✅/❌ | |

**Tester Name**: ________________  
**Test Date**: ________________  
**Overall Status**: ✅ Ready for Production / ❌ Issues Found

---

## Known Issues & Notes

```
[Add any issues found during testing here]

Example:
- Issue #1: COD form validation not showing for empty name field
  Status: Fixed / Pending
  
- Issue #2: Razorpay modal not appearing on first click
  Status: Fixed / Pending
```

---

## Follow-Up Actions

- [ ] Fix any issues found
- [ ] Re-test problematic areas
- [ ] Update documentation if needed
- [ ] Deploy to staging
- [ ] Final production review
- [ ] Deploy to production
- [ ] Monitor live orders

