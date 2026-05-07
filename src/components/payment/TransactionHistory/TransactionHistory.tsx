"use client";

import { useSelector } from "react-redux";

import type { RootState } from "@/store/store";

export const TransactionHistory =
  () => {
    const transactions =
      useSelector(
        (
          state: RootState
        ) =>
          state.transactions
            .transactions
      );

    return (
      <div
        className="
          rounded-3xl
          bg-white
          p-6
          shadow-sm
        "
      >
        {/* Header */}

        <div className="mb-6">
          <h2
            className="
              text-2xl
              font-bold
              text-slate-900
            "
          >
            Transaction History
          </h2>

          <p
            className="
              mt-1 text-sm
              text-slate-500
            "
          >
            View previous
            payment attempts and
            statuses.
          </p>
        </div>

        {/* Empty State */}

        {transactions.length ===
        0 ? (
          <div
            className="
              flex min-h-48
              items-center
              justify-center

              rounded-2xl
              border border-dashed
              border-slate-200

              bg-slate-50
            "
          >
            <p
              className="
                text-sm
                text-slate-500
              "
            >
              No transactions
              yet.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {transactions.map(
              (
                transaction
              ) => (
                <button
                  key={
                    transaction.id
                  }
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-slate-200
                    p-4
                    text-left
                    transition-all
                    duration-200

                    hover:border-slate-300
                    hover:shadow-sm
                  "
                >
                  {/* Top Row */}

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p
                        className="
                          text-sm
                          font-semibold
                          text-slate-900
                        "
                      >
                        {
                          transaction.id
                        }
                      </p>

                      <p
                        className="
                          mt-1 text-xs
                          text-slate-500
                        "
                      >
                        {
                          transaction.timestamp
                        }
                      </p>
                    </div>

                    {/* Status */}

                    <div
                      className={`
                        rounded-full
                        px-3 py-1
                        text-xs
                        font-semibold
                        capitalize

                        ${
                          transaction.status ===
                          "success"
                            ? "bg-green-100 text-green-700"

                            : transaction.status ===
                                "failed" ||
                              transaction.status ===
                                "timeout"
                            ? "bg-red-100 text-red-700"

                            : "bg-yellow-100 text-yellow-700"
                        }
                      `}
                    >
                      {
                        transaction.status
                      }
                    </div>
                  </div>

                  {/* Bottom Row */}

                  <div className="mt-4 flex items-center justify-between">
                    <p
                      className="
                        text-lg
                        font-bold
                        text-slate-900
                      "
                    >
                      {
                        transaction.currency
                      }{" "}
                      {
                        transaction.amount
                      }
                    </p>

                    <p
                      className="
                        text-xs
                        text-slate-500
                      "
                    >
                      Attempts:{" "}
                      {
                        transaction.attempts
                      }
                    </p>
                  </div>

                  {/* Error Message */}

                  {transaction.errorMessage && (
                    <p
                      className="
                        mt-3 text-xs
                        text-red-500
                      "
                    >
                      {
                        transaction.errorMessage
                      }
                    </p>
                  )}
                </button>
              )
            )}
          </div>
        )}
      </div>
    );
  };