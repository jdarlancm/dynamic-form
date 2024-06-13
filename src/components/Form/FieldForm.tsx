import React from "react";
import { Controller, Control, ControllerRenderProps } from "react-hook-form";
import { format } from "date-fns";

import fieldComponents from "./FieldRegisty";
import { FieldTypes, FormField } from "./Form.types";
import FieldMask from "./fields/FieldMask";

type FieldFormProps = {
  fieldForm: FormField;
  control: Control<any>;
  setValue: (name: string, value: any) => void;
  errors: Record<string, any>;
  isReadOnly: boolean;
};

const inputStyle =
  "mt-1 p-2 w-full block shadow-sm sm:text-sm border border-gray-300 dark:border-gray-700 rounded-md text-gray-700";

const FieldForm: React.FC<FieldFormProps> = ({
  fieldForm,
  control,
  setValue,
  errors,
  isReadOnly,
}) => {
  const renderLabel = () => (
    <label htmlFor={fieldForm.name} className="block text-sm font-medium">
      {fieldForm.label}
      {fieldForm.required && <span className="text-red-500"> *</span>}
    </label>
  );

  const renderComponent = (field: ControllerRenderProps<any, string>) => {
    let Component;

    if (fieldForm.mask) Component = FieldMask;
    else Component = fieldComponents[fieldForm.type];

    let specificProps: { [key: string]: any } = {};

    if (fieldForm.type !== FieldTypes.select) {
      specificProps.readOnly = isReadOnly;
      specificProps.id = fieldForm.name;
    }

    switch (fieldForm.type) {
      case FieldTypes.select:
        specificProps.instanceId = fieldForm.name;
        specificProps.options = fieldForm.options || [];
        specificProps.isDisabled = isReadOnly;
        specificProps.isClearable = true;
        specificProps.formValue = fieldForm.value;
        break;

      case FieldTypes.currency:
      case FieldTypes.number:
        specificProps.value = String(fieldForm.value);
        specificProps.onChange = (value: string) =>
          setValue(fieldForm.name, value);
        break;

      case FieldTypes.int:
        specificProps.value = fieldForm.value || 0;
        specificProps.onChange = (value: number) =>
          setValue(fieldForm.name, value);
        break;

      case FieldTypes.date:
        specificProps.type = fieldForm.type;
        specificProps.value = fieldForm.value
          ? new Date(fieldForm.value as Date).toISOString().split("T")[0]
          : "";
        break;

      default:
        if (fieldForm.mask) {
          specificProps.mask = fieldForm.mask;
        } else {
          specificProps.type = fieldForm.type;
        }
    }

    return (
      <Component
        className={`${inputStyle} ${isReadOnly ? "bg-gray-400" : ""}`}
        {...specificProps}
        {...field}
      />
    );
  };

  const renderError = () =>
    errors[fieldForm.name] && (
      <p className="text-red-500 dark:text-red-300 text-sm">
        {errors[fieldForm.name]?.message as string}
      </p>
    );

  const formatValue = (value: any, fieldType: FieldTypes, mask?: string) => {
    if (value instanceof Date) {
      return format(value, "yyyy-MM-dd");
    }

    return String(value);
  };

  return (
    <div className="w-full">
      {renderLabel()}
      <Controller
        name={fieldForm.name}
        control={control}
        defaultValue={
          fieldForm.value !== undefined
            ? formatValue(fieldForm.value, fieldForm.type, fieldForm.mask)
            : ""
        }
        render={({ field }) => renderComponent(field)}
      />
      {renderError()}
    </div>
  );
};

export default FieldForm;
