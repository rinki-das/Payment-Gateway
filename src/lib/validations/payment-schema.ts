import { z } from "zod";

import { isFutureExpiryDate } from "@/lib/helpers/payment-validation";

export const paymentSchema = z
  .object({
    cardholderName: z
      .string()
      .min(
        3,
        "Cardholder name is required"
      ),

    cardNumber: z
      .string()
      .min(
        19,
        "Invalid card number"
      ),

    expiryDate: z
      .string()
      .refine(
        isFutureExpiryDate,
        {
          message:
            "Card has expired",
        }
      ),

    cvv: z.string(),

    amount: z.coerce
      .number()
      .positive(
        "Amount must be greater than 0"
      ),

    currency: z.enum([
      "INR",
      "USD",
    ]),
  })
  .superRefine(
    (values, context) => {
      const sanitized =
        values.cardNumber.replace(
          /\s/g,
          ""
        );

      const isAmex =
        /^3[47]/.test(
          sanitized
        );

      if (
        isAmex &&
        !/^\d{4}$/.test(
          values.cvv
        )
      ) {
        context.addIssue({
          code: z.ZodIssueCode.custom,

          path: ["cvv"],

          message:
            "American Express requires 4-digit CVV",
        });
      }

      if (
        !isAmex &&
        !/^\d{3}$/.test(
          values.cvv
        )
      ) {
        context.addIssue({
          code: z.ZodIssueCode.custom,

          path: ["cvv"],

          message:
            "CVV must be 3 digits",
        });
      }
    }
  );

/*
|--------------------------------------------------------------------------
| IMPORTANT
|--------------------------------------------------------------------------
|
| input type = before zod parsing
| output type = after zod parsing
|
*/

export type PaymentFormInput =
  z.input<typeof paymentSchema>;

export type PaymentFormValues =
  z.output<typeof paymentSchema>;