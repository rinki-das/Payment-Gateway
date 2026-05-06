import { create } from "zustand";

import {
  PaymentStatus,
  Transaction,
} from "@/types/payment";

interface PaymentStore {
  status: PaymentStatus;

  transactions: Transaction[];

  selectedTransaction:
    | Transaction
    | null;

  setStatus: (
    status: PaymentStatus
  ) => void;

  addTransaction: (
    transaction: Transaction
  ) => void;

  selectTransaction: (
    transaction: Transaction
  ) => void;
}

export const usePaymentStore =
  create<PaymentStore>((set) => ({
    status: "idle",

    transactions: [],

    selectedTransaction: null,

    setStatus: (status) =>
      set({
        status,
      }),

    addTransaction: (transaction) =>
      set((state) => ({
        transactions: [
          transaction,
          ...state.transactions,
        ],
      })),

    selectTransaction: (
      transaction
    ) =>
      set({
        selectedTransaction:
          transaction,
      }),
  }));