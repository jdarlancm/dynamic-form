import { ZodType } from "zod";

export enum FormAction {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  VIEW = "VIEW",
  DELETE = "DELETE",
}

export enum FieldTypes {
  select = "select",
  textarea = "textarea",
  currency = "currency",
  text = "text",
  date = "date",
  email = "email",
  number = "number",
  int = "int",
}

export interface Option {
  value: string;
  label: string;
}

export interface FormField {
  name: string;
  label: string;
  type: FieldTypes;
  required?: boolean;
  mask?: string;
  readOnly?: boolean;
  value?: string | number | Date | boolean | undefined | null;
  options?: Option[];
  validator: ZodType;
  customClassName?: string;
  visibleInList?: boolean;
  widthInList?: string;
  primaryKey?: boolean;
}

export interface EntityForm<T> {
  object: T;
  newObject: T;

  onCreate(object: T): void;
  onUpdate(object: T): void;
  onDelete(object: T): void;
  createFormSchema(action: FormAction): FormField[];
  baseSchema: FormField[];
}
