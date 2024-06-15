import { FieldTypes } from "../Form";
import { FilterCondition } from "./EntityBrowser.types";

export const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

export const validateValueForFieldType = (
  value: string,
  fieldType: FieldTypes
): boolean => {
  switch (fieldType) {
    case FieldTypes.date:
      return validateDate(value);
    case FieldTypes.currency:
    case FieldTypes.number:
      return !isNaN(Number(value));
    case FieldTypes.int:
      return Number.isInteger(Number(value));
    default:
      return true;
  }
};

export const validateConditionForField = (
  condition: FilterCondition,
  fieldType: FieldTypes
): boolean => {
  switch (condition) {
    case FilterCondition.Equals:
      return true;

    case FilterCondition.Contains:
    case FilterCondition.StartsWith:
    case FilterCondition.EndsWith:
      return [
        FieldTypes.select,
        FieldTypes.textarea,
        FieldTypes.text,
        FieldTypes.email,
      ].includes(fieldType);

    case FilterCondition.LessThan:
    case FilterCondition.GreaterThan:
    case FilterCondition.LessOrEqual:
    case FilterCondition.GreaterOrEqual:
      return [
        FieldTypes.date,
        FieldTypes.currency,
        FieldTypes.number,
        FieldTypes.int,
      ].includes(fieldType);

    default:
      return false;
  }
};

export const validateDate = (dateString: string): boolean => {
  const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(\d{4})$/;
  if (!regex.test(dateString)) {
    return false;
  }
  const [day, month, year] = dateString.split("/").map(Number);
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
};
