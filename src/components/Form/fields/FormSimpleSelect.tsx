import React from "react";
import { Option } from "../Form.types";

interface FormSimpleSelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "options"> {
  options: Option[];
}

const FormSimpleSelect: React.ForwardRefExoticComponent<FormSimpleSelectProps> =
  React.forwardRef<HTMLSelectElement, FormSimpleSelectProps>(
    ({ options, ...props }, ref) => (
      <select {...props} ref={ref}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    )
  );

FormSimpleSelect.displayName = "FormSimpleSelect";

export default FormSimpleSelect;
