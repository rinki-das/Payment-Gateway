import { NextResponse } from "next/server";

import { PaymentResponse } from "@/types/payment";

const sleep = (
  duration: number
) =>
  new Promise((resolve) =>
    setTimeout(resolve, duration)
  );

export async function POST() {
  /*
  |--------------------------------------------------------------------------
  | Simulate Processing Delay
  |--------------------------------------------------------------------------
  */

  await sleep(2000);

  /*
  |--------------------------------------------------------------------------
  | Randomized Gateway Response
  |--------------------------------------------------------------------------
  */

  const random = Math.random();

  /*
  |--------------------------------------------------------------------------
  | SUCCESS — 60%
  |--------------------------------------------------------------------------
  */

  if (random < 0.6) {
    const response: PaymentResponse =
      {
        success: true,

        status: "success",

        message:
          "Payment processed successfully.",
      };

    return NextResponse.json(
      response
    );
  }

  /*
  |--------------------------------------------------------------------------
  | FAILED — 25%
  |--------------------------------------------------------------------------
  */

  if (random < 0.85) {
    const failureReasons = [
      "Insufficient funds",
      "Bank declined transaction",
      "Card verification failed",
      "Payment authorization failed",
    ];

    const randomReason =
      failureReasons[
        Math.floor(
          Math.random() *
            failureReasons.length
        )
      ];

    const response: PaymentResponse =
      {
        success: false,

        status: "failed",

        message: randomReason,
      };

    return NextResponse.json(
      response,
      {
        status: 400,
      }
    );
  }

  /*
  |--------------------------------------------------------------------------
  | TIMEOUT — 15%
  |--------------------------------------------------------------------------
  */

  await sleep(8000);

  const response: PaymentResponse =
    {
      success: false,

      status: "timeout",

      message:
        "Payment request timed out.",
    };

  return NextResponse.json(
    response
  );
}