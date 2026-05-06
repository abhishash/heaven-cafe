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
  bg_color: string,
  text_color: string,
  products: Product[];
  order_rating: number | null;
}

export interface OrderStatusCount {
  total: number;
  bg_color: string;   // hex color (e.g. "#CCFBF1")
  text_color: string; // hex color (e.g. "#115E59")
}

export interface OrdersResponse {
  status: boolean;
  message: string;
  total: number;
  count: Record<string, OrderStatusCount>;
  total_orders: number;
  bg_color: string;   // hex color (e.g. "#CCFBF1")
  text_color: string; // hex color (e.g. "#115E59")
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



export interface OrderResponse {
  status: boolean;
  message: string;
  data: Order;
}

export interface Order {
  id: number;
  order_no: string;
  user_id: number;
  address_id: number;

  total_amount: string;
  total_discount: string;
  delhivery_charge: number;
  final_amount: string;

  status: string;
  payment_status: string;
  payment_method: string;

  delhivery_boy_id: number | null;
  barcode: string | null;

  order_type: string;
  table_no: string | null;

  reward_points: number;
  description: string | null;

  created_at: string;
  updated_at: string;

  payment_type: string;
  due_date: string | null;

  items: OrderItem[];
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;

  qty: number;

  price: string;
  discount: string;
  final_price: string;

  created_at: string;
  updated_at: string;

  product: Product;
}


export interface Product {
  id: number;
  sku_product_id: string;

  name: string;
  brand_name: string;

  image: string;
  status: string;

  price: string;
  ac_price: string;

  stock: string;
  in_stock: string;

  category: string | number;
  sub_category: string | number | null;

  description: string | null;
  short_description: string | null;

  slug: string;
  url: string;

  created_at: string;
  updated_at: string;

  product_type: string;

  rating: number | null;
  review: number | null;
}