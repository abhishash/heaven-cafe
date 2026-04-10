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