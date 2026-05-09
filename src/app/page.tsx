"use client";

import { PaymentForm } from "@/components/payment/PaymentForm/PaymentForm";
import PaymentOutcome from "@/components/payment/PaymentOutcome/PaymentOutcome";

import { TransactionHistory } from "@/components/payment/TransactionHistory/TransactionHistory";

import { useTransactionPersistence } from "@/hooks/useTransactionPersistence";
import { PaymentStatus } from "@/types/payment";
import { useState } from "react";

export default function HomePage() {
  /*
  |--------------------------------------------------------------------------
  | Persist Transactions
  |--------------------------------------------------------------------------
  */

  const [paymentOutcome, setPaymentOutcome] = useState<{
    status: PaymentStatus;
    message: string;
    transactionId: string;
    attempt: number;
  } | null>(null);

  useTransactionPersistence();

  return (
    <main
      className="
        min-h-screen
        bg-slate-100
        px-4 py-8
        md:px-6
      "
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}

        <div className="mb-8">
          <h1
            className="
              text-3xl font-bold
              tracking-tight
              text-slate-900
              md:text-4xl
            "
          >
            Payment Gateway
          </h1>

          <p
            className="
              mt-2 text-sm
              text-slate-500
              md:text-base
            "
          >
            Securely process card payments with real-time transaction tracking.
          </p>
        </div>

        {/* Main Grid */}

        <div
          className="
            grid gap-8
            lg:grid-cols-[1.2fr_0.8fr]
          "
        >
          {/* Payment Section */}

          <section className="space-y-6">
            <PaymentForm setPaymentOutcome={setPaymentOutcome} />
          </section>

          {/* Transaction Section */}

          <aside className="space-y-6">
            {/* Payment Outcome */}

            <aside className="space-y-6">
              {paymentOutcome && (
                <PaymentOutcome
                  status={paymentOutcome.status}
                  message={paymentOutcome.message}
                  transactionId={paymentOutcome.transactionId}
                  attempt={paymentOutcome.attempt}
                  onRetry={() => {}}
                />
              )}
            </aside>

            {/* Transaction History */}

            <TransactionHistory />
          </aside>
        </div>
      </div>
    </main>
  );
}
