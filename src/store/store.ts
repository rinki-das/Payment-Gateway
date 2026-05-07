import { configureStore } from "@reduxjs/toolkit";

import paymentReducer from "./features/payment/paymentSlice";

import transactionReducer from "./features/transaction/transactionSlice";

export const store = configureStore({
  reducer: {
    payment: paymentReducer,

    transactions:
      transactionReducer,
  },
});

export type RootState =
  ReturnType<typeof store.getState>;

export type AppDispatch =
  typeof store.dispatch;