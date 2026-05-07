import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import { Transaction } from "@/types/payment";

interface TransactionState {
  transactions: Transaction[];
}

const initialState: TransactionState =
  {
    transactions: [],
  };

const transactionSlice =
  createSlice({
    name: "transactions",

    initialState,

    reducers: {
      setTransactions: (
        state,

        action:
          PayloadAction<
            Transaction[]
          >
      ) => {
        state.transactions =
          action.payload;
      },

      addOrUpdateTransaction:
        (
          state,

          action:
            PayloadAction<Transaction>
        ) => {
          const existingIndex =
            state.transactions.findIndex(
              (
                transaction
              ) =>
                transaction.id ===
                action.payload.id
            );

          /*
          |--------------------------------------------------------------------------
          | Update Existing Transaction
          |--------------------------------------------------------------------------
          */

          if (
            existingIndex !== -1
          ) {
            state.transactions[
              existingIndex
            ] = action.payload;

            return;
          }

          /*
          |--------------------------------------------------------------------------
          | Add New Transaction
          |--------------------------------------------------------------------------
          */

          state.transactions.unshift(
            action.payload
          );
        },
    },
  });

export const {
  setTransactions,

  addOrUpdateTransaction,
} = transactionSlice.actions;

export default transactionSlice.reducer;