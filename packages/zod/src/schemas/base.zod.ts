import z4 from "zod/v4";

export abstract class ZodBase {
  static timestamps = z4.object({
    created_at: z4.coerce.date().optional(),
    updated_at: z4.coerce.date().optional(),
  });
}

export type TimestampsZtype = z4.infer<typeof ZodBase.timestamps>;
