import { CardType } from "@/types/payment";

export const detectCardType = (
  cardNumber: string
): CardType => {
  const sanitized =
    cardNumber.replace(/\s/g, "");

  if (/^4/.test(sanitized)) {
    return "visa";
  }

  if (/^5[1-5]/.test(sanitized)) {
    return "mastercard";
  }

  if (/^3[47]/.test(sanitized)) {
    return "amex";
  }

  return "unknown";
};