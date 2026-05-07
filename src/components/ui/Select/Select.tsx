import {
  SelectHTMLAttributes,
} from "react";

import { cn } from "@/lib/helpers/cn";

interface SelectProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;

  error?: string;
}

export const Select = ({
  label,
  error,
  id,
  className,
  children,
  ...props
}: SelectProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="
          text-sm
          font-semibold
          text-slate-800
        "
      >
        {label}
      </label>

      <select
        id={id}
        aria-invalid={!!error}
        aria-describedby={
          error
            ? `${id}-error`
            : undefined
        }
        className={cn(
          `
            h-13 rounded-2xl
            border border-slate-300
            bg-white px-4
            text-sm text-slate-900

            transition-all duration-200

            focus:border-blue-500
            focus:outline-none
            focus:ring-4
            focus:ring-blue-100

            disabled:cursor-not-allowed
            disabled:bg-slate-100
          `,
          error &&
            `
              border-red-400
              focus:border-red-500
              focus:ring-red-100
            `,
          className
        )}
        {...props}
      >
        {children}
      </select>

      {error && (
        <p
          id={`${id}-error`}
          className="
            text-xs
            font-medium
            text-red-500
          "
        >
          {error}
        </p>
      )}
    </div>
  );
};