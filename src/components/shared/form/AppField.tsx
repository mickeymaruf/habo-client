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
    <div className={cn("space-y-1.5", className)}>
      <Label
        htmlFor={field.name}
        className={cn(
          "text-[10px] font-black tracking-[0.2em] text-black/50 uppercase transition-colors",
          isInvalid && "text-destructive",
        )}
      >
        {label}
      </Label>

      <div className="group relative">
        {prepend && (
          <div className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-black transition-transform group-focus-within:scale-110">
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
            // --- NEW BRUTALIST STYLING ---
            "rounded-none border-2 border-black bg-white py-6 text-sm font-bold tracking-tight uppercase transition-all placeholder:font-medium placeholder:text-black/20",
            "focus-visible:border-[#A3E635] focus-visible:ring-0 focus-visible:ring-offset-0",
            "disabled:bg-zinc-100 disabled:opacity-50",
            prepend && "pl-12",
            append && "pr-12",
            isInvalid && "border-destructive focus-visible:border-destructive",
          )}
        />

        {append && (
          <div className="absolute top-1/2 right-4 h-5 w-5 -translate-y-1/2 text-black/40 hover:text-black">
            {append}
          </div>
        )}
      </div>

      {isInvalid && (
        <p
          id={`${field.name}-error`}
          role="alert"
          className="text-destructive text-[10px] font-black tracking-tighter uppercase italic"
        >
          {firstError}
        </p>
      )}
    </div>
  );
}
