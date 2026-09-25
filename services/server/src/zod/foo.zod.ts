import z4 from "zod";
import { ZodBase } from "./base.zod";

export abstract class FooZSchema extends ZodBase {
  // static email = z4
  //   .email({ error: "Invalid email" })
  //   .max(255, { error: "Email must be at most 255 characters" });
}

// export type EmailZType = z4.infer<typeof FooZSchema.email>;
