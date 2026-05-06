import { z } from "zod";

import { isFutureExpiryDate } from "@/lib/helpers/payment-validation";

export const paymentSchema = z.object({
  cardholderName: z
    .string()
    .min(
      3,
      "Cardholder name is required"
    ),

  cardNumber: z
    .string()
    .min(19, "Invalid card number"),

  expiryDate: z
    .string()
    .refine(isFutureExpiryDate, {
      message: "Card has expired",
    }),

  cvv: z
    .string()
    .regex(
      /^\d{3,4}$/,
      "Invalid CVV"
    ),

  amount: z.coerce
    .number()
    .positive(
      "Amount must be greater than 0"
    ),

  currency: z.enum(["INR", "USD"]),
});

export type PaymentFormValues =
  z.infer<typeof paymentSchema>;