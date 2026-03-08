'use server';

import { razorpayInstance } from '@/lib/razorpay';
import crypto from 'crypto';

interface CreateOrderParams {
  amount: number; // in dollars, will be converted to paise
  orderId: string;
  customerEmail: string;
  customerName: string;
}

export async function createRazorpayOrder({
  amount,
  orderId,
  customerEmail,
  customerName,
}: CreateOrderParams) {
  try {
    // Convert dollars to paise (1 dollar = 100 paise, but for this example we'll use INR)
    // Amount should be in paise, so multiply by 100
    const amountInPaise = Math.round(amount * 100);

    const order = await razorpayInstance.orders.create({
      amount: amountInPaise,
      currency: 'INR',
      receipt: orderId,
      notes: {
        email: customerEmail,
        name: customerName,
        orderId: orderId,
      },
    });

    return {
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    };
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return {
      success: false,
      error: 'Failed to create payment order',
    };
  }
}

interface VerifyPaymentParams {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}

export async function verifyRazorpayPayment({
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature,
}: VerifyPaymentParams) {
  try {
    const secret = process.env.RAZORPAY_KEY_SECRET!;
    const body = razorpayOrderId + '|' + razorpayPaymentId;
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body)
      .digest('hex');

    const isSignatureValid = expectedSignature === razorpaySignature;

    if (!isSignatureValid) {
      return {
        success: false,
        error: 'Payment signature verification failed',
      };
    }

    return {
      success: true,
      message: 'Payment verified successfully',
      paymentId: razorpayPaymentId,
      orderId: razorpayOrderId,
    };
  } catch (error) {
    console.error('Error verifying Razorpay payment:', error);
    return {
      success: false,
      error: 'Failed to verify payment',
    };
  }
}
