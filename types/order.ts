import { LucideIcon } from "lucide-react";

export interface ProductPivot {
  order_id: number;
  product_id: number;
}

export interface Product {
  id: number;
  name: string;
  image: string;
  pivot: ProductPivot;
}

export interface Order {
  id: number;
  order_no: string;
  status: string;
  total_amount: string;
  final_amount: string;
  payment_method: string;
  created_at: string; // ISO date
  products: Product[];
  order_rating: number | null;
}

export interface OrdersResponse {
  status: boolean;
  message: string;
  data: Order[];
}

export type PaymentMethodName =
  | "cod"
  | "wallet"
  | "razorpay"
  | "stripe"
  | "payu"
  | "card";

export interface PaymentMethod {
  id: string;
  name: string; // or PaymentMethodName (see note below)
  status: number; // 1 = active, 0 = inactive
  description: string;
  icon: LucideIcon;
  badge: string;
  label: string;
  cards?: PaymentCard[];
}

export interface PaymentMethodsResponse {
  status: boolean;
  message: string;
  data: PaymentMethod[];
}

export interface PaymentCard {
  id: string | number;
  card_number: string;
  card_name: string;
  balance: string;
  status: number;
  is_primary: number;
  expiry_date: string;
}
