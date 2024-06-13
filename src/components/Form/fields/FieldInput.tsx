import React from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (props, ref) => {
    return <input ref={ref} {...props} />;
  }
);

InputField.displayName = "InputField";

export default InputField;
