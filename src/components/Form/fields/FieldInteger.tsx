import React, { useState } from "react";

type FieldIntegerProps = {
  value: number;
  onChange: (value: number) => void;
  readOnly?: boolean;
  id?: string;
  className?: string;
};

const FieldInteger: React.FC<FieldIntegerProps> = ({
  value,
  onChange,
  readOnly,
  id,
  className,
}) => {
  const convertInt = (value: string) => {
    const intValue = parseInt(value, 10);
    return !isNaN(intValue) ? intValue : 0;
  };

  const [internalValue, setInternalValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const intValue = convertInt(e.target.value);
    setInternalValue(intValue);
    onChange(intValue);
  };

  return (
    <input
      type="number"
      value={internalValue}
      onChange={handleChange}
      readOnly={readOnly}
      id={id}
      className={className}
      step="1"
    />
  );
};

export default FieldInteger;
