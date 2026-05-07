import {
  PAYMENT_TIMEOUT_MS,
} from "@/lib/constants/payment";

import {
  PaymentPayload,
  PaymentResponse,
} from "@/types/payment";

export const processPayment =
  async (
    payload: PaymentPayload
  ): Promise<PaymentResponse> => {
    const controller =
      new AbortController();

    const timeoutId =
      setTimeout(() => {
        controller.abort();
      }, PAYMENT_TIMEOUT_MS);

    try {
      const response =
        await fetch("/api/pay", {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(
            payload
          ),

          signal:
            controller.signal,
        });

      const data: PaymentResponse =
        await response.json();

      /*
      |--------------------------------------------------------------------------
      | API Failure Response
      |--------------------------------------------------------------------------
      */

      if (!response.ok) {
        return data;
      }

      return data;
    } catch (error) {
      /*
      |--------------------------------------------------------------------------
      | Timeout Error
      |--------------------------------------------------------------------------
      */

      if (
        error instanceof DOMException &&
        error.name ===
          "AbortError"
      ) {
        return {
          success: false,

          status: "timeout",

          message:
            "Payment request timed out.",
        };
      }

      /*
      |--------------------------------------------------------------------------
      | Network Error
      |--------------------------------------------------------------------------
      */

      return {
        success: false,

        status: "failed",

        message:
          "Network error occurred.",
      };
    } finally {
      clearTimeout(timeoutId);
    }
  };