import React, { useState, ChangeEvent, ForwardedRef } from "react";

interface CurrencyInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  onChange: (value: string) => void;
}

const FieldCurrency = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ onChange, value, ...props }, ref: ForwardedRef<HTMLInputElement>) => {
    const formatCurrency = (value: string): string => {
      const val = Number(value) ? value : "0";

      const formattedValue = new Intl.NumberFormat("pt-BR", {
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(Number(val));
      onChange(formattedValue);
      return formattedValue;
    };

    const [internalValue, setInternalValue] = useState(
      formatCurrency(value as string)
    );

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      const rawValue = event.target.value.replace(/[^\d]/g, "");
      const numericValue = Number(rawValue) / 100;
      const formattedValue = numericValue.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      setInternalValue(formattedValue);
      onChange(formattedValue);
    };

    return (
      <input
        {...props}
        ref={ref}
        value={internalValue}
        onChange={handleInputChange}
      />
    );
  }
);

FieldCurrency.displayName = "FieldCurrency";

export default FieldCurrency;
