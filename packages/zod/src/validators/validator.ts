import { ZodBase } from "@/schemas";
import type z from "zod";

export class Validator {
  protected validate<T>(
    payload: unknown,
    schema: z.ZodType<T>
  ): z.ZodSafeParseResult<T> {
    const validatePayload = schema.safeParse(payload);
    if (validatePayload.error && !validatePayload.success) {
      return { error: validatePayload.error, success: false };
    }
    return { data: validatePayload.data, success: true };
  }
}
