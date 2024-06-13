import { ZodType } from "zod";
import { ActionReturn } from "../EntityBrowser/EntityBrowser.types";

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

  onCreate(object: T): ActionReturn;
  onUpdate(object: T): ActionReturn;
  onDelete(object: T): ActionReturn;
  createFormSchema(action: FormAction): FormField[];
  baseSchema: FormField[];
}
