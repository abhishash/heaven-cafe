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

export type LeadStatus = "pending" | "approved" | "rejected" | "processing";

export interface CardType {
  id: number;
  name: string;
  discount_percent: number | null;
  status: 0 | 1;
  description: string; // HTML / plain text
  image: string;
  created_at: string;
  updated_at: string;
}

export interface Lead {
  id: number;
  user_id: number;
  card_type_id: number;
  crn: string;
  status: LeadStatus;
  name: string;
  phone: string;
  email: string;
  created_at: string; // ISO date
  updated_at: string; // ISO date
  card_type: CardType;
}

export interface CardApiResponse {
  success: boolean;
  applied_cards: AppliedCard[];
  available_card_types: CardType[];
  leads: Lead[];
}

export interface AppliedCard {
  id: number;
  user_id: number;
  card_type_id: number;
  card_number: string;
  card_name: string;
  balance: string; // API gives string (can convert to number if needed)
  status: 0 | 1;
  is_primary: 0 | 1;
  expiry_date: string; // YYYY-MM-DD
  created_at: string; // ISO
  updated_at: string; // ISO
  card_type: CardType;
}

export interface CardType {
  id: number;
  name: string;
  discount_percent: number | null;
  status: 0 | 1;
  description: string; // HTML string
  image: string;
  created_at: string; // ISO date
  updated_at: string; // ISO date
}