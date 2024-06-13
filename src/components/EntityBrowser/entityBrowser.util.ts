import { format } from "date-fns";

import { FieldTypes } from "../Form";

export const applyMask = (value: string, mask: string): string => {
  let maskedValue = "";
  let maskIndex = 0;
  for (let i = 0; i < value.length; i++) {
    if (maskIndex >= mask.length) break;
    if (mask[maskIndex] === "9") {
      if (/\d/.test(value[i])) {
        maskedValue += value[i];
        maskIndex++;
      } else {
        continue;
      }
    } else {
      maskedValue += mask[maskIndex];
      maskIndex++;
      i--;
    }
  }
  return maskedValue;
};

export const formatValue = (
  value: any,
  fieldType: FieldTypes,
  mask?: string
) => {
  if (value instanceof Date) {
    return format(value, "dd/MM/yyyy");
  }

  if (mask) {
    return applyMask(value, mask);
  }

  if (Number(value)) {
    if (fieldType === FieldTypes.currency) {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value);
    } else {
      return value.toFixed(2).replace(".", ",");
    }
  }

  return String(value);
};

export const getAlignmentClass = (fieldType: FieldTypes) => {
  switch (fieldType) {
    case FieldTypes.date:
      return "text-center";
    case FieldTypes.currency:
      return "text-right";
    default:
      return "text-left";
  }
};
