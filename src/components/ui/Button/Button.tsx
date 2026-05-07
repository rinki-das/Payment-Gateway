import { ButtonHTMLAttributes } from "react";

import clsx from "clsx";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export const Button = ({
  children,
  loading,
  disabled,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      disabled={disabled || loading}
      className={clsx(
        `
          flex h-13 w-full items-center
          justify-center rounded-2xl
          bg-blue-600 px-4
          text-sm font-semibold text-white
          transition-all duration-200
          hover:bg-blue-700
          disabled:cursor-not-allowed
          disabled:opacity-60
        `,
        className
      )}
      {...props}
    >
      {loading
        ? "Processing..."
        : children}
    </button>
  );
};