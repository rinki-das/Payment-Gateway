export type CardType =
  | "visa"
  | "mastercard"
  | "amex"
  | "unknown";

export type PaymentStatus =
  | "idle"
  | "processing"
  | "success"
  | "failed"
  | "timeout";

export interface PaymentPayload {
  transactionId: string;

  cardholderName: string;

  cardNumber: string;

  expiryDate: string;

  cvv: string;

  amount: number;

  currency: "INR" | "USD";
}

export interface PaymentResponse {
  success: boolean;

  status: PaymentStatus;

  message: string;
}

export interface Transaction {
  id: string;

  amount: number;

  currency: "INR" | "USD";

  status: PaymentStatus;

  timestamp: string;

  attempts: number;

  errorMessage?: string;
}