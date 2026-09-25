import {
  eq,
  ne,
  gt,
  gte,
  lt,
  lte,
  isNull,
  isNotNull,
  inArray,
  notInArray,
  like,
  ilike,
  notLike,
  notIlike,
  between,
  notBetween,
} from "drizzle-orm";

const operators = {
  eq,
  ne,
  gt,
  gte,
  lt,
  lte,
  isNull,
  isNotNull,
  inArray,
  notInArray,
  like,
  ilike,
  notLike,
  notIlike,
  between,
  notBetween,
};

type DrizzleOperator = keyof typeof operators;

export type FilterConditionType = "OR" | "AND";

export interface FilterGroup<T> {
  type: DrizzleOperator;
  data: Partial<T>;
}
