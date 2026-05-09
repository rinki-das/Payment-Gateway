"use client";

import { useMemo } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/Button/Button";

import { Select } from "@/components/ui/Select/Select";

import {
  paymentSchema,
  PaymentFormInput,
  PaymentFormValues,
} from "@/lib/validations/payment-schema";

import { formatCardNumber, formatExpiryDate } from "@/lib/formatters/card";

import { detectCardType } from "@/lib/helpers/card-type";

import { CardPreview } from "../CardPreview/CardPreview";

import { FormInput } from "@/components/ui/Button/FormInput/FormInput";

import { processPayment } from "@/services/payment-service";

import { AppDispatch, RootState } from "@/store/store";
import {
  setCurrentTransactionId,
  setPaymentStatus,
  setErrorMessage,
  resetRetryAttempts,
  incrementRetryAttempts,
} from "@/store/features/payment/paymentSlice";
import { addOrUpdateTransaction } from "@/store/features/transaction/transactionSlice";
import { PaymentStatus } from "@/types/payment";

type PaymentOutcomeState = {
  status: PaymentStatus;
  message: string;
  transactionId: string;
  attempt: number;
};

type Props = {
  setPaymentOutcome: React.Dispatch<
    React.SetStateAction<PaymentOutcomeState | null>
  >;
};

export const PaymentForm = ({ setPaymentOutcome }: Props) => {
  /*
  |--------------------------------------------------------------------------
  | Redux
  |--------------------------------------------------------------------------
  */

  const dispatch = useDispatch<AppDispatch>();

  const payment = useSelector((state: RootState) => state.payment);

  /*
  |--------------------------------------------------------------------------
  | Form
  |--------------------------------------------------------------------------
  */

  const {
    register,
    handleSubmit,
    watch,
    setValue,

    formState: { errors, isValid, isSubmitting },
  } = useForm<PaymentFormInput, unknown, PaymentFormValues>({
    resolver: zodResolver(paymentSchema),

    mode: "onChange",

    reValidateMode: "onChange",

    defaultValues: {
      cardholderName: "",

      cardNumber: "",

      expiryDate: "",

      cvv: "",

      amount: "" as unknown as number,

      currency: "INR",
    },
  });

  /*
  |--------------------------------------------------------------------------
  | Watch Form State
  |--------------------------------------------------------------------------
  */

  const cardholderName = watch("cardholderName");

  const cardNumber = watch("cardNumber");

  const expiryDate = watch("expiryDate");

  /*
  |--------------------------------------------------------------------------
  | Card Type Detection
  |--------------------------------------------------------------------------
  */

  const cardType = useMemo(() => {
    return detectCardType(cardNumber || "");
  }, [cardNumber]);

  /*
  |--------------------------------------------------------------------------
  | Submit Handler
  |--------------------------------------------------------------------------
  */

  const onSubmit = async (values: PaymentFormValues) => {
    /*
  |--------------------------------------------------------------------------
  | Prevent Retry Overflow
  |--------------------------------------------------------------------------
  */

    if (payment.retryAttempts >= 3) {
      return;
    }

    /*
  |--------------------------------------------------------------------------
  | Transaction ID
  |--------------------------------------------------------------------------
  */

    let transactionId = payment.currentTransactionId;

    if (!transactionId) {
      transactionId = crypto.randomUUID();

      dispatch(setCurrentTransactionId(transactionId));
    }

    /*
  |--------------------------------------------------------------------------
  | Processing State
  |--------------------------------------------------------------------------
  */

    dispatch(setPaymentStatus("processing"));

    setPaymentOutcome({
      status: "processing",
      message: "Please wait while we process your payment.",
      transactionId,
      attempt: payment.retryAttempts + 1,
    });

    dispatch(setErrorMessage(null));

    try {
      /*
    |--------------------------------------------------------------------------
    | API Request
    |--------------------------------------------------------------------------
    */

      const response = await processPayment({
        transactionId,

        ...values,
      });

      /*
    |--------------------------------------------------------------------------
    | Transaction History Update
    |--------------------------------------------------------------------------
    */

      dispatch(
        addOrUpdateTransaction({
          id: transactionId,

          amount: values.amount,

          currency: values.currency,

          status: response.status,

          timestamp: new Date().toLocaleString(),

          attempts: payment.retryAttempts + 1,

          errorMessage:
            response.status === "success" ? undefined : response.message,
        })
      );

      /*
    |--------------------------------------------------------------------------
    | Success
    |--------------------------------------------------------------------------
    */

      if (response.status === "success") {
        dispatch(setPaymentStatus("success"));

        dispatch(resetRetryAttempts());

        setPaymentOutcome({
          status: "success",
          message: response.message,
          transactionId,
          attempt: payment.retryAttempts + 1,
        });

        return;
      }

      /*
    |--------------------------------------------------------------------------
    | Failed / Timeout
    |--------------------------------------------------------------------------
    */

      dispatch(setPaymentStatus(response.status));

      dispatch(setErrorMessage(response.message));
      setPaymentOutcome({
        status: response.status,
        message: response.message,
        transactionId,
        attempt: payment.retryAttempts + 1,
      });

      dispatch(incrementRetryAttempts());
    } catch {
      /*
    |--------------------------------------------------------------------------
    | Unexpected Error
    |--------------------------------------------------------------------------
    */

      dispatch(
        addOrUpdateTransaction({
          id: transactionId,

          amount: values.amount,

          currency: values.currency,

          status: "failed",

          timestamp: new Date().toLocaleString(),

          attempts: payment.retryAttempts + 1,

          errorMessage: "Something went wrong.",
        })
      );

      dispatch(setPaymentStatus("failed"));

      dispatch(setErrorMessage("Something went wrong."));
      setPaymentOutcome({
        status: "failed",
        message: "Something went wrong.",
        transactionId,
        attempt: payment.retryAttempts + 1,
      });

      dispatch(incrementRetryAttempts());
    }
  };

  return (
    <div className="space-y-6">
      {/* Card Preview */}

      <CardPreview
        cardholderName={cardholderName}
        cardNumber={cardNumber}
        expiryDate={expiryDate}
        cardType={cardType}
      />

      {/* Payment Form */}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="
          space-y-5 rounded-3xl
          bg-white p-6 shadow-sm
        "
      >
        {/* Header */}

        <div className="space-y-1">
          <h2
            className="
              text-2xl font-bold
              text-slate-900
            "
          >
            Payment Details
          </h2>

          <p
            className="
              text-sm text-slate-500
            "
          >
            Complete your payment securely.
          </p>
        </div>

        {/* Cardholder Name */}

        <FormInput
          id="cardholderName"
          label="Cardholder Name"
          placeholder="John Doe"
          autoComplete="cc-name"
          error={errors.cardholderName?.message}
          {...register("cardholderName")}
        />

        {/* Card Number */}

        <FormInput
          id="cardNumber"
          label="Card Number"
          placeholder="4242 4242 4242 4242"
          autoComplete="cc-number"
          maxLength={19}
          error={errors.cardNumber?.message}
          {...register("cardNumber", {
            onChange: (event) => {
              const formatted = formatCardNumber(event.target.value);

              setValue("cardNumber", formatted, {
                shouldValidate: true,
              });
            },
          })}
        />

        {/* Expiry + CVV */}

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            id="expiryDate"
            label="Expiry Date"
            placeholder="MM/YY"
            autoComplete="cc-exp"
            maxLength={5}
            error={errors.expiryDate?.message}
            {...register("expiryDate", {
              onChange: (event) => {
                const formatted = formatExpiryDate(event.target.value);

                setValue("expiryDate", formatted, {
                  shouldValidate: true,
                });
              },
            })}
          />

          <FormInput
            id="cvv"
            label="CVV"
            placeholder={cardType === "amex" ? "1234" : "123"}
            autoComplete="cc-csc"
            maxLength={cardType === "amex" ? 4 : 3}
            error={errors.cvv?.message}
            {...register("cvv")}
          />
        </div>

        {/* Amount + Currency */}

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            id="amount"
            label="Amount"
            type="number"
            min="1"
            step="0.01"
            placeholder="100"
            error={errors.amount?.message}
            {...register("amount")}
          />

          <Select
            id="currency"
            label="Currency"
            error={errors.currency?.message}
            {...register("currency")}
          >
            <option value="INR">INR</option>

            <option value="USD">USD</option>
          </Select>
        </div>

        {/* Payment Status */}

        {/* {payment.status !== "idle" && (
          <div
            className={`
              rounded-2xl border p-4 text-sm font-medium

              ${
                payment.status === "success"
                  ? "border-green-200 bg-green-50 text-green-700"
                  : payment.status === "processing"
                    ? "border-blue-200 bg-blue-50 text-blue-700"
                    : "border-red-200 bg-red-50 text-red-700"
              }
            `}
          >
            {payment.status === "processing"
              ? "Processing payment..."
              : payment.status === "success"
                ? "Payment processed successfully."
                : payment.errorMessage}

            {(payment.status === "failed" || payment.status === "timeout") && (
              <p className="mt-2 text-xs">
                Attempt {payment.retryAttempts} of 3
              </p>
            )}
          </div>
        )} */}

        {/* Submit */}

        <Button
          type="submit"
          loading={isSubmitting}
          disabled={
            !isValid ||
            payment.status === "processing" ||
            payment.retryAttempts >= 3
          }
        >
          {payment.retryAttempts > 0 ? "Retry Payment" : "Pay Now"}
        </Button>

        {/* Final Failure */}

        {payment.retryAttempts >= 3 && (
          <p
            className="
              text-center text-sm
              font-medium text-red-600
            "
          >
            Maximum retry attempts reached.
          </p>
        )}
      </form>
    </div>
  );
};
