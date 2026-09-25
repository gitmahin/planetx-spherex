import z4 from "zod/v4";

// Narrow a `string | z.ZodError` service return down to a ZodError.
export function isZodError(value: unknown): value is z4.ZodError {
  return value instanceof z4.ZodError;
}
