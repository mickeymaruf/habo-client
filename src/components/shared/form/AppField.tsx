import type { AnyFieldApi } from "@tanstack/react-form";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const getErrorMessage = (error: unknown): string => {
  if (typeof error === "string") return error;

  if (error && typeof error === "object") {
    if ("message" in error && typeof error.message === "string") {
      return error.message;
    }
  }

  return String(error);
};

type AppFieldProps = {
  field: AnyFieldApi;
  label: string;
  type?: "text" | "email" | "password" | "number";
  placeholder?: string;
  append?: React.ReactNode;
  prepend?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onChangeOverride?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function AppField({
  field,
  label,
  type = "text",
  placeholder,
  append,
  prepend,
  className,
  disabled = false,
  onChangeOverride,
}: AppFieldProps) {
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  const firstError =
    field.state.meta.isTouched && field.state.meta.errors.length > 0
      ? getErrorMessage(field.state.meta.errors[0])
      : null;
  //   const hasError = firstError !== null;

  return (
    <div className={cn("space-y-2", className)}>
      <Label
        htmlFor={field.name}
        className={cn(
          "text-sm font-semibold text-gray-700",
          isInvalid && "text-destructive",
        )}
      >
        {label}
      </Label>

      <div className="relative">
        {prepend && (
          <div className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400">
            {prepend}
          </div>
        )}

        <Input
          id={field.name}
          name={field.name}
          type={type}
          value={field.state.value}
          onBlur={field.handleBlur}
          // If override exists, use it. Else, use default string handler.
          onChange={
            onChangeOverride || ((e) => field.handleChange(e.target.value))
          }
          aria-invalid={isInvalid}
          placeholder={placeholder}
          disabled={disabled}
          aria-describedby={isInvalid ? `${field.name}-error` : undefined}
          className={cn(
            "rounded-full border-gray-300 bg-white py-6 focus-visible:ring-blue-500",
            prepend && "pl-12",
            append && "pr-12",
            isInvalid && "border-destructive focus-visible:ring-destructive/20",
          )}
        />

        {append && (
          <div className="absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 text-gray-400">
            {append}
          </div>
        )}
      </div>

      {isInvalid && (
        <p
          id={`${field.name}-error`}
          role="alert"
          className="text-destructive text-sm"
        >
          {firstError}
        </p>
      )}
    </div>
  );
}
