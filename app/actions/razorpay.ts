'use server';

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
    const amountInPaise = Math.round(amount * 100);

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return { success: false, error: 'Razorpay keys are missing on server' };
    }

    const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');

    // 🚀 Bypassing Razorpay npm package completely to avoid Server Crash
    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amountInPaise,
        currency: 'INR',
        receipt: orderId,
      }),
      cache: 'no-store'
    });

    const order = await response.json();

    if (!response.ok) {
      console.error('Razorpay API Error:', order);
      return { success: false, error: order.error?.description || 'Failed to create payment order' };
    }

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
    const secret = process.env.RAZORPAY_KEY_SECRET;

    if (!secret) {
      return {
        success: false,
        error: 'Razorpay secret is not configured',
      };
    }

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
