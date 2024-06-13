import React from "react";

interface FieldTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const FieldTextarea = React.forwardRef<HTMLTextAreaElement, FieldTextareaProps>(
  ({ value, ...props }, ref) => {
    return <textarea {...props} ref={ref} value={value} />;
  }
);

FieldTextarea.displayName = "FieldTextarea";

export default FieldTextarea;
