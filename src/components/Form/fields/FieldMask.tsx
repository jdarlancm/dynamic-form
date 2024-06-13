import React from "react";
import InputMask, { Props as InputMaskProps } from "react-input-mask";

interface FieldMaskProps extends InputMaskProps {}

const FieldMask = React.forwardRef<HTMLInputElement, FieldMaskProps>(
  ({ mask, ...props }, ref: React.Ref<HTMLInputElement>) => {
    return <InputMask mask={mask} {...props} />;
  }
);

FieldMask.displayName = "FieldMask";

export default FieldMask;
