export interface User {
  id: number;
  name: string;
  email: string;
  otp: string | null;
  otp_expires_at: string | null;
  email_verify: number; // or boolean (see note below)
  phone: string;
  status: string | null;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  wallet_points: number;
}

export interface AuthResponse {
  status: boolean;
  user: User;
}