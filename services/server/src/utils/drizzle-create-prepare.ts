// Important when handling large, deeply nested data relationships
import {
  and,
  or,
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
  SQL,
  sql,
} from "drizzle-orm";
import type { PgColumn, PgTable } from "drizzle-orm/pg-core";
import { pgDb } from "@/libs/db.connect";
import type { DrizzleOperator, FilterConditionType } from "@/types";
import type { InferSelectModel } from "drizzle-orm";

function buildSqlFiltersForPrepare(
  table: PgTable,
  filters: Record<string, DrizzleOperator>
): SQL[] {
  const sql_filters: SQL[] = [];

  for (const [key, operator] of Object.entries(filters)) {
    const column = (table as any)[key];
    if (!column) continue;

    switch (operator) {
      case "eq":
        sql_filters.push(eq(column, sql.placeholder(key)));
        break;
      case "ne":
        sql_filters.push(ne(column, sql.placeholder(key)));
        break;
      case "gt":
        sql_filters.push(gt(column, sql.placeholder(key)));
        break;
      case "gte":
        sql_filters.push(gte(column, sql.placeholder(key)));
        break;
      case "lt":
        sql_filters.push(lt(column, sql.placeholder(key)));
        break;
      case "lte":
        sql_filters.push(lte(column, sql.placeholder(key)));
        break;
      case "like":
        sql_filters.push(like(column, sql.placeholder(key)));
        break;
      case "ilike":
        sql_filters.push(ilike(column, sql.placeholder(key)));
        break;
      case "notLike":
        sql_filters.push(notLike(column, sql.placeholder(key)));
        break;
      case "notIlike":
        sql_filters.push(notIlike(column, sql.placeholder(key)));
        break;
      case "inArray":
        sql_filters.push(inArray(column, sql.placeholder(key)));
        break;
      case "notInArray":
        sql_filters.push(notInArray(column, sql.placeholder(key)));
        break;
      case "between":
        sql_filters.push(
          between(
            column,
            sql.placeholder(`${key}_from`),
            sql.placeholder(`${key}_to`)
          )
        );
        break;
      case "notBetween":
        sql_filters.push(
          notBetween(
            column,
            sql.placeholder(`${key}_from`),
            sql.placeholder(`${key}_to`)
          )
        );
        break;
      case "isNull":
        sql_filters.push(isNull(column));
        break;
      case "isNotNull":
        sql_filters.push(isNotNull(column));
        break;
    }
  }

  return sql_filters;
}

type ExecuteParams<
  Row,
  F extends Partial<Record<keyof Row, DrizzleOperator>>,
> = {
  [
    K in keyof F as F[K] extends "between" | "notBetween"
      ? `${string & K}_from`
      : F[K] extends "isNull" | "isNotNull"
        ? never
        : K
  ]: F[K] extends "inArray" | "notInArray"
    ? K extends keyof Row
      ? Row[K][]
      : never
    : K extends keyof Row
      ? Row[K]
      : never;
} & {
  [
    K in keyof F as F[K] extends "between" | "notBetween"
      ? `${string & K}_to`
      : never
  ]: K extends keyof Row ? Row[K] : never;
};

/**
 * Creates a type-safe Drizzle prepared statement for optimized, reusable database queries.
 *
 * Prepared statements are pre-compiled by the database, making them faster for repeated execution.
 * This function dynamically builds the selection and the `WHERE` clause placeholders
 * based on the provided `filters` map.
 *
 * @template TTable - The Drizzle table schema type.
 * @template TSelectKeys - The string keys selected from the table.
 * @template TFilters - A constant mapping of column names to Drizzle operators (e.g., 'eq', 'ilike').
 *
 * @param table - The Drizzle table object (e.g., `users`).
 * @param selects - An array of column names to retrieve.
 * @param filters - An object mapping column names to operators. This defines the required parameters for `.execute()`.
 * @param prepare_key - A unique string identifier for this prepared statement in the Drizzle cache.
 * @param filterConditionType - Whether to combine filters with `AND` or `OR`. Defaults to `"AND"`.
 *
 * @returns A Drizzle Prepared Query object with an enhanced `execute` method that is strictly typed
 *          to the filters and selection provided.
 *
 * @example
 * ```typescript
 * // 1. Create the prepared statement once (e.g., at the module level or in a constructor)
 * const findUserByEmail = createPrepareStatement(
 *   users,
 *   ["id", "firstName", "email"],
 *   {
 *     email: "eq",
 *     status: "eq"
 *   },
 *   "find_user_by_email_and_status"
 * );
 *
 * // 2. Execute it later with specific parameters
 * // The 'params' argument is typed to { email: string; status: string }
 * const results = await executePreparedStatement(findUserByEmail, {
 *   email: "john@doe.com",
 *   status: "active"
 * });
 * ```
 */
export function createPrepareStatement<
  TTable extends PgTable<any>,
  TSelectKeys extends keyof InferSelectModel<TTable> & string,
  const TFilters extends Partial<
    Record<keyof InferSelectModel<TTable> & string, DrizzleOperator>
  >,
>(
  table: TTable,
  selects: TSelectKeys[],
  filters: TFilters,
  prepare_key: string,
  filterConditionType: FilterConditionType = "AND"
) {
  type Row = InferSelectModel<TTable>;

  const selection = Object.fromEntries(
    selects.map((key) => [key, (table as any)[key]])
  ) as { [K in TSelectKeys]: PgColumn };

  const conditions = buildSqlFiltersForPrepare(
    table,
    filters as Record<string, DrizzleOperator>
  );

  const query = pgDb
    .select(selection)
    .from(table as any)
    .where(
      filterConditionType === "AND" ? and(...conditions) : or(...conditions)
    )
    .prepare(prepare_key);

  return query as typeof query & {
    execute: (
      params: ExecuteParams<Row, TFilters>
    ) => Promise<Pick<Row, TSelectKeys>[]>;
  };
}

export async function executePreparedStatement<
  T extends { execute: (params: any) => Promise<any> },
>(
  preparedQuery: T,
  params: Parameters<T["execute"]>[0]
): Promise<Awaited<ReturnType<T["execute"]>>> {
  return await preparedQuery.execute(params);
}
