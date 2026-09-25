import z4 from "zod";

/**
 * Transforms a Zod raw shape by making every property "nullish"
 * (both optional and nullable).
 *
 * This utility is useful for creating "Patch" or "Partial" schemas where
 * fields can be explicitly set to `null` or omitted entirely.
 *
 * @param shape - The Zod raw shape (the internal object structure of a ZodObject).
 * @returns A new shape where every key maps to a nullish version of the original schema.
 *
 * @example
 * ```typescript
 * const bar = z4.object({
 *   name: z4.string(),
 *   age: z4.number()
 * });
 *
 * // Every field in foo is now: string | null | undefined
 * const foo = z4.object(toNullish(bar.shape));
 * ```
 */
export function toNullish<T extends z4.ZodRawShape>(shape: T) {
  return Object.fromEntries(
    Object.entries(shape).map(([key, schema]) => [
      key,
      (schema as z4.ZodType).nullish(),
    ])
  ) as unknown as { [K in keyof T]: z4.ZodOptional<z4.ZodNullable<T[K]>> };
}
