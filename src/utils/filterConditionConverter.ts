import {
  Filter,
  FilterCondition,
} from "@/components/EntityBrowser/EntityBrowser.types";

export const filterConditionConverter = (filter: Filter) => {
  const { field, operator, value } = filter;

  switch (FilterCondition[operator]) {
    case FilterCondition.Equals:
      return (item: any) => item[field] == value;

    case FilterCondition.Contains:
      return (item: any) => item[field]?.includes(value);

    case FilterCondition.StartsWith:
      return (item: any) => item[field]?.startsWith(value);

    case FilterCondition.EndsWith:
      return (item: any) => item[field]?.endsWith(value);

    case FilterCondition.LessThan:
      return (item: any) => new Date(item[field]) < new Date(value);

    case FilterCondition.GreaterThan:
      return (item: any) => new Date(item[field]) > new Date(value);

    case FilterCondition.LessOrEqual:
      return (item: any) => new Date(item[field]) <= new Date(value);

    case FilterCondition.GreaterOrEqual:
      return (item: any) => new Date(item[field]) >= new Date(value);

    default:
      return () => true;
  }
};
