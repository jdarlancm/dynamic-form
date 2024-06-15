import { IconType } from "react-icons";

export type PaginatedData<T> = {
  paginatedData: T[];
  totalPages: number;
};

export type MainAction = {
  icon: IconType;
  label: string;
  onClick: () => void;
  className: string;
};

export type ActionsItem<T> = {
  view: (item: T) => void;
  edit: (item: T) => void;
  delete: (item: T) => void;
  [key: string]: ((item: T) => void) | undefined;
};

export type ActionReturn = {
  success: boolean;
  message: string;
};

export enum FilterCondition {
  Equals = "igual à",
  Contains = "contém",
  StartsWith = "começa com",
  EndsWith = "termina com",
  LessThan = "menor que",
  GreaterThan = "maior que",
  LessOrEqual = "menor ou igual à",
  GreaterOrEqual = "maior ou igual à",
}

export type Filter = {
  field: string;
  operator: FilterCondition | "";
  value: string;
};
