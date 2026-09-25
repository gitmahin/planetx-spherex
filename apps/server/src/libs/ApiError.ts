import { type ApiErrorType } from "@/types";
import {
  SystemCustomErrorMsgByCode,
  type SystemCustomErrorMessageDataType,
} from "@/events";

/**
 * A standardized exception class for all API-related failures.
 *
 * This class extends the native `Error` to include HTTP status codes,
 * machine-readable error codes, and an array of specific error details
 * (e.g., validation failures).
 *
 * @example
 * throw new ApiError(400, SystemCustomErrorMsgByCode.INVALID_INPUT, undefined, ["Email is required"]);
 */
export class ApiError extends Error implements ApiErrorType {
  public success?: boolean;
  public status: number;
  public errors: unknown[];
  constructor(
    status: number,
    public error:
      | (typeof SystemCustomErrorMsgByCode)[keyof typeof SystemCustomErrorMsgByCode]
      | SystemCustomErrorMessageDataType,
    override stack?: string,
    errors?: unknown[]
  ) {
    super(error.message);
    this.status = status;
    this.success = false;
    this.errors = errors ?? [];

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
