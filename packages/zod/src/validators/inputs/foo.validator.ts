import type z from "zod";
import { Validator } from "../validator";

export class FooInputValidators extends Validator {
  // exampleInput(payload: ExampleZType): ExampleZType | z.ZodError {
  //   const { data, success, error } = this.validate(payload, ExampleZSchema.example);
  //   if (!success) {
  //     return error;
  //   }
  //   return data;
  // }
}
