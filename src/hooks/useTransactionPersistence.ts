"use client";

import { useEffect } from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import type {
  RootState,
  AppDispatch,
} from "@/store/store";

import {
  setTransactions,
} from "@/store/features/transaction/transactionSlice";

export const useTransactionPersistence =
  () => {
    const dispatch =
      useDispatch<AppDispatch>();

    const transactions =
      useSelector(
        (
          state: RootState
        ) =>
          state.transactions
            .transactions
      );

    /*
    |--------------------------------------------------------------------------
    | Load Transactions
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
      const storedTransactions =
        localStorage.getItem(
          "transactions"
        );

      if (
        storedTransactions
      ) {
        dispatch(
          setTransactions(
            JSON.parse(
              storedTransactions
            )
          )
        );
      }
    }, [dispatch]);

    /*
    |--------------------------------------------------------------------------
    | Persist Transactions
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
      localStorage.setItem(
        "transactions",

        JSON.stringify(
          transactions
        )
      );
    }, [transactions]);
  };