import { CardType } from "@/types/payment";

import { cn } from "@/lib/helpers/cn";

interface CardPreviewProps {
  cardholderName: string;

  cardNumber: string;

  expiryDate: string;

  cardType: CardType;

  isFocused?: boolean;

  isProcessing?: boolean;
}

const CARD_BRAND_MAP: Record<
  CardType,
  string
> = {
  visa: "VISA",

  mastercard: "MASTERCARD",

  amex: "AMEX",

  unknown: "CARD",
};

export const CardPreview = ({
  cardholderName,
  cardNumber,
  expiryDate,
  cardType,
  isFocused,
  isProcessing,
}: CardPreviewProps) => {
  /*
  |--------------------------------------------------------------------------
  | Fallback Values
  |--------------------------------------------------------------------------
  */

  const formattedName =
    cardholderName?.trim() ||
    "YOUR NAME";

  const formattedNumber =
    cardNumber ||
    "•••• •••• •••• ••••";

  const formattedExpiry =
    expiryDate || "MM/YY";

  const brandLabel =
    CARD_BRAND_MAP[cardType];

  return (
    <section
      aria-label="Payment card preview"
      className={cn(
        `
          relative overflow-hidden

          rounded-[32px]

          bg-gradient-to-br
          from-slate-800
          via-slate-900
          to-black

          p-6 text-white

          shadow-2xl

          transition-all duration-300

          md:p-8
        `,
        isFocused &&
          `
            ring-4 ring-blue-400/30
          `,
        isProcessing &&
          `
            animate-pulse
          `
      )}
    >
      {/* Background Effects */}

      <div
        className="
          absolute -right-16 -top-16
          h-48 w-48 rounded-full
          bg-white/5 blur-3xl
        "
      />

      <div
        className="
          absolute -bottom-24 -left-24
          h-64 w-64 rounded-full
          bg-blue-500/10 blur-3xl
        "
      />

      {/* Card Content */}

      <div className="relative z-10">
        {/* Top Section */}

        <div className="flex items-start justify-between">
          {/* Card Chip */}

          <div
            aria-hidden="true"
            className="
              h-12 w-16 rounded-xl

              bg-gradient-to-br
              from-yellow-200
              via-yellow-400
              to-yellow-600

              shadow-lg
            "
          />

          {/* Brand Badge */}

          <div
            className={cn(
              `
                rounded-full
                border border-white/10

                bg-white/5

                px-4 py-2

                text-xs font-semibold
                uppercase tracking-[3px]

                backdrop-blur-sm
              `,
              cardType ===
                "visa" &&
                "text-blue-300",

              cardType ===
                "mastercard" &&
                "text-orange-300",

              cardType ===
                "amex" &&
                "text-emerald-300",

              cardType ===
                "unknown" &&
                "text-slate-300"
            )}
          >
            {brandLabel}
          </div>
        </div>

        {/* Card Number */}

        <div className="mt-14 md:mt-16">
          <p
            className="
              break-all

              text-2xl
              font-semibold

              tracking-[4px]

              sm:text-3xl
            "
          >
            {formattedNumber}
          </p>
        </div>

        {/* Footer */}

        <div
          className="
            mt-10 flex
            items-end justify-between
            gap-6
          "
        >
          {/* Card Holder */}

          <div className="min-w-0">
            <span
              className="
                text-[10px]
                uppercase
                tracking-[2px]

                text-slate-400
              "
            >
              Card Holder
            </span>

            <p
              className="
                mt-2 truncate

                text-sm
                font-medium
                uppercase

                tracking-wide

                text-white
              "
            >
              {formattedName}
            </p>
          </div>

          {/* Expiry */}

          <div className="shrink-0">
            <span
              className="
                text-[10px]
                uppercase
                tracking-[2px]

                text-slate-400
              "
            >
              Expires
            </span>

            <p
              className="
                mt-2 text-sm
                font-medium
                tracking-wide
              "
            >
              {formattedExpiry}
            </p>
          </div>
        </div>

        {/* Processing Overlay */}

        {isProcessing && (
          <div
            className="
              absolute inset-0

              flex items-center
              justify-center

              rounded-[32px]

              bg-black/40
              backdrop-blur-sm
            "
          >
            <div
              className="
                flex items-center
                gap-3 rounded-full

                border border-white/10

                bg-white/10

                px-5 py-3

                text-sm font-medium
              "
            >
              <div
                className="
                  h-4 w-4
                  animate-spin

                  rounded-full

                  border-2
                  border-white/20
                  border-t-white
                "
              />

              Processing Payment
            </div>
          </div>
        )}
      </div>
    </section>
  );
};