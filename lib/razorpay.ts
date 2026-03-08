import Razorpay from 'razorpay';

if (!process.env.RAZORPAY_KEY_ID) {
  throw new Error('RAZORPAY_KEY_ID is not defined');
}

if (!process.env.RAZORPAY_KEY_SECRET) {
  throw new Error('RAZORPAY_KEY_SECRET is not defined');
}

export const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export interface RazorpayOrderData {
  amount: number; // in paise (1 rupee = 100 paise)
  currency: string;
  receipt: string;
  notes?: Record<string, string>;
}

export interface RazorpayOrder {
  id: string;
  entity: string;
  amount: number;
  currency: string;
  receipt: string;
  status: string;
  created_at: number;
}
