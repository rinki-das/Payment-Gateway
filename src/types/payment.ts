export type PaymentStatus =
  | "idle"
  | "processing"
  | "success"
  | "failed"
  | "timeout";

export type CardType =
  | "visa"
  | "mastercard"
  | "amex"
  | "unknown";

export type Currency =
  | "INR"
  | "USD";

export interface PaymentPayload {
  transactionId: string;

  cardholderName: string;

  cardNumber: string;

  expiryDate: string;

  cvv: string;

  amount: number;

  currency: Currency;
}

export interface PaymentResponse {
  success: boolean;

  status: PaymentStatus;

  message?: string;
}

export interface Transaction {
  id: string;

  amount: number;

  currency: Currency;

  status: PaymentStatus;

  timestamp: string;

  attempts: number;

  failureReason?: string;
}