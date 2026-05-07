import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaymentStatus } from "@/types/payment";
interface PaymentState {
  status: PaymentStatus;
  retryAttempts: number;
  currentTransactionId: string | null;
  errorMessage: string | null;
}
const initialState: PaymentState = {
  status: "idle",
  retryAttempts: 0,
  currentTransactionId: null,
  errorMessage: null,
};
const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPaymentStatus: (state, action: PayloadAction<PaymentStatus>) => {
      state.status = action.payload;
    },
    incrementRetryAttempts: (state) => {
      state.retryAttempts += 1;
    },
    resetRetryAttempts: (state) => {
      state.retryAttempts = 0;
    },
    setCurrentTransactionId: (state, action: PayloadAction<string>) => {
      state.currentTransactionId = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<string | null>) => {
      state.errorMessage = action.payload;
    },
    resetPaymentState: (state) => {
      state.status = "idle";
      state.retryAttempts = 0;
      state.currentTransactionId = null;
      state.errorMessage = null;
    },
  },
});
export const {
  setPaymentStatus,
  incrementRetryAttempts,
  resetRetryAttempts,
  setCurrentTransactionId,
  setErrorMessage,
  resetPaymentState,
} = paymentSlice.actions;
export default paymentSlice.reducer;
