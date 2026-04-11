export interface WalletPoint {
  "status": boolean;
  "points": number
}

export type PointType = "credit" | "debit";

export interface WalletPointItem {
  id: number;
  order_id: number;
  order_no: string;
  created_at: string;
  points: number;
  type: PointType;
  description: string;
  expiry_date: string; // ISO format: YYYY-MM-DD
}

export interface WalletPointsResponse {
  status: boolean;
  available_points: number;
  points: WalletPointItem[];
}