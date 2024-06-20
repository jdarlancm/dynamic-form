import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ZodSchema, ZodType, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormAction, FormField } from "./Form.types";
import FieldForm from "./FieldForm";

const buttonStyle =
  "mr-2 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline";

type FormProps<T> = {
  schema: FormField[];
  columns: number;
  action: FormAction;
  onSubmit: (data: T) => void;
  onCancel: () => void;
  submitError: string | null;
};

const Form = <T,>({
  schema,
  columns,
  action,
  onSubmit,
  onCancel,
  submitError,
}: FormProps<T>) => {
  const zodSchema = createZodSchema(schema);
  type FormValues = z.infer<typeof zodSchema>;

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({ resolver: zodResolver(zodSchema) });

  const getGridColsClass = (columns: number) => {
    switch (columns) {
      case 2:
        return "md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2";
      case 3:
        return "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3";
      case 4:
        return "md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4";
      case 5:
        return "md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5";
      default:
        return "md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1";
    }
  };

  const renderField = (field: FormField) => {
    const isReadOnly =
      action === FormAction.VIEW ||
      action === FormAction.DELETE ||
      (field?.readOnly !== undefined ? field.readOnly : false) ||
      (field?.primaryKey !== undefined ? field.primaryKey : false);

    return (
      <div
        key={field.name}
        className={`p-2 grid col-span-1 ${
          field.customClassName ? field.customClassName : ""
        }`}
      >
        <FieldForm
          fieldForm={field}
          control={control}
          setValue={setValue}
          errors={errors}
          isReadOnly={isReadOnly}
        />
      </div>
    );
  };

  const btnSubmitText = action === FormAction.DELETE ? "Apagar" : "Confirmar";
  const btnCancelText = action === FormAction.VIEW ? "Fechar" : "Cancelar";

  const btnSubmitColor =
    action === FormAction.DELETE
      ? "bg-red-500 hover:bg-red-700 text-white"
      : "bg-primary hover:bg-primary-dark text-white";

  return (
    <div className="bg-gray-200 dark:bg-gray-800 w-11/12 m-auto mt-4 text-gray-700 dark:text-gray-200 rounded-md p-2">
      <form
        onSubmit={handleSubmit(onSubmit as SubmitHandler<FormValues>)}
        className="space-y-6"
      >
        {submitError && (
          <div className="mb-4 p-2 bg-red-500 text-white rounded">
            {submitError}
          </div>
        )}

        <div className={`grid grid-cols-1 ${getGridColsClass(columns)} gap-6`}>
          {schema.map(renderField)}
        </div>
        <div id="footer" className="mr-2 mt-4 flex justify-end">
          <button
            type="button"
            onClick={onCancel}
            className={`${buttonStyle} bg-gray-700 hover:bg-gray-400 text-gray-300 dark:bg-gray-300 dark:text-gray-700`}
          >
            {btnCancelText}
          </button>
          {action !== FormAction.VIEW && (
            <button
              type="submit"
              className={`${buttonStyle} ${btnSubmitColor}`}
            >
              {btnSubmitText}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

const createZodSchema = (formSchema: FormField[]): ZodSchema => {
  const zodSchemaFields: Record<string, ZodType<any>> = {};

  formSchema.forEach((field) => {
    const { name, validator } = field;
    zodSchemaFields[name] = validator || z.string();
  });

  return z.object(zodSchemaFields);
};

export default Form;
