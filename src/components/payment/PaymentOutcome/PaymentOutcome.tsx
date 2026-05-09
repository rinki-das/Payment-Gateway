"use client";

import { PaymentStatus } from "@/types/payment";

type Props = {
  status: PaymentStatus;
  message: string;
  transactionId?: string;
  attempt: number;
  onRetry: () => void;
};

const MAX_RETRY = 3;

const statusConfig: Record<
  Exclude<PaymentStatus, "idle">,
  {
    icon: string;
    title: string;
    titleColor: string;
  }
> = {
  processing: {
    icon: "⏳",
    title: "Processing Payment",
    titleColor: "text-blue-600",
  },

  success: {
    icon: "✅",
    title: "Payment Successful",
    titleColor: "text-green-600",
  },

  failed: {
    icon: "❌",
    title: "Payment Failed",
    titleColor: "text-red-600",
  },

  timeout: {
    icon: "⌛",
    title: "Payment Timeout",
    titleColor: "text-yellow-600",
  },
};

export default function PaymentOutcome({
  status,
  message,
  transactionId,
  attempt,
  onRetry,
}: Props) {
  const config = statusConfig[status];

  const canRetry =
    (status === "failed" || status === "timeout") && attempt < MAX_RETRY;

  return (
    <section
      className="
      w-full
      rounded-2xl
      border
      bg-white
      p-8
      shadow-sm
      text-center
      space-y-5
    "
    >
      {/* ICON */}

      <div className="text-6xl">{config.icon}</div>

      {/* TITLE */}

      <h2 className={`text-2xl font-bold ${config.titleColor}`}>
        {config.title}
      </h2>

      {/* MESSAGE */}

      <p className="text-gray-600">{message}</p>

      {/* PROCESSING LOADER */}

      {status === "processing" && (
        <div
          className="
            mx-auto
            h-10
            w-10
            animate-spin
            rounded-full
            border-4
            border-gray-300
            border-t-black
          "
        />
      )}

      {/* SUCCESS DETAILS */}

      {status === "success" && transactionId && (
        <div className="rounded-lg bg-gray-50 p-4 text-sm text-gray-500">
          Transaction ID:
          <div className="mt-1 font-medium text-gray-700 break-all">
            {transactionId}
          </div>
        </div>
      )}

      {/* RETRY SECTION */}

      {(status === "failed" || status === "timeout") && (
        <div className="space-y-4">
          <div className="text-sm text-gray-400">
            Attempt {attempt} of {MAX_RETRY}
          </div>

          {canRetry ? (
            <button
              onClick={onRetry}
              className="
                rounded-xl
                bg-black
                px-5
                py-3
                font-medium
                text-white
                transition
                hover:opacity-90
                active:scale-[0.98]
              "
            >
              Retry Payment
            </button>
          ) : (
            <p className="text-sm font-medium text-red-500">
              Maximum retry limit reached.
            </p>
          )}
        </div>
      )}
    </section>
  );
}
