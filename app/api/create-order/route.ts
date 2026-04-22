import { getRazorpayInstance } from "@/lib/razorpay";
import { NextRequest, NextResponse } from "next/server";

type CreateOrderRequestBody = {
  amount?: number;
  currency?: string;
  receipt?: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as CreateOrderRequestBody;
    const amount = Number(body.amount);

    if (!Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json(
        { error: "A valid amount is required" },
        { status: 400 },
      );
    }

    const razorpay = getRazorpayInstance();
    const options = {
      amount: Math.round(amount * 100),
      currency: body.currency ?? "INR",
      receipt: body.receipt ?? `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json(order);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to create Razorpay order";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
