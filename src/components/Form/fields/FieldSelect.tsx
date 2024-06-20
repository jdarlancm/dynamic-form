import React from "react";
import Select, { Props } from "react-select";
import { Option } from "../Form.types";

interface SelectFieldProps extends Props {
  field: any;
  formValue: string;
  options: Option[];
  onChange: (...event: any[]) => void;
}

const SelectField = React.forwardRef<Props, SelectFieldProps>(
  ({ field, formValue, options, onChange, ...props }, ref) => {
    return (
      <Select
        {...props}
        options={options}
        value={options?.find((option) => option.value === formValue)}
        onChange={(selectedOption) =>
          onChange((selectedOption as Option).value)
        }
      />
    );
  }
);

SelectField.displayName = "SelectField";

export default SelectField;
