import { baseConfig } from "@/config";
import { SystemCustomErrorCode, SystemCustomErrorMsgByCode } from "@/events";
import { ApiError, logger } from "@/libs";
import type { ApiErrorType } from "@/types";

import type { NextFunction, Request, Response } from "express";

/**
 * Global Error Handling Middleware for Express.
 *
 * This middleware intercepts all errors passed via `next(err)`. It performs
 * three critical functions:
 * 1. **Normalization**: Converts native JS Errors into standardized {@link ApiError} objects.
 * 2. **Security**: Strips sensitive stack traces in production environments.
 * 3. **Observability**: Populates `res.locals` for centralized logging (e.g., Pino/Winston).
 *
 * @param err - The error object (could be a custom ApiError or a native Error).
 * @param req - The Express Request object.
 * @param res - The Express Response object.
 * @param next - The Express Next function.
 */
export const errorHandlerMiddleware = (
  err: Error | ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  logger.error(err);
  let error: ApiError;
  /**
   * Normalization
   * If the error is not already an instance of our custom ApiError,
   * we wrap it in a 500 Internal Server Error structure.
   */
  if (err instanceof ApiError) {
    error = err;
  } else {
    const message = err?.message || "Something went wrong";

    // Create a new ApiError representing a generic system failure
    error = new ApiError(
      500,
      {
        ...SystemCustomErrorMsgByCode[
          SystemCustomErrorCode.INTERNAL_SERVER_ERROR
        ]!,
        message, // Use the actual error message for internal tracking
      },
      err.stack,
      []
    );
  }

  /**
   * Observability (Pino Logging Integration)
   * We store the specific error details in `res.locals`.
   * This allows the logging middleware to capture the error context
   * after the response has been sent.
   */
  res.locals.errorTitle = error.error.title;
  res.locals.errorMessage = error.error.message;
  res.locals.errorCode = error.error.code;
  res.locals.errors = error.errors;

  const status = error.status;
  const success = error.success;
  const response: ApiErrorType = {
    ...error.error,
    status,
    success,
    ...(baseConfig.NODE_ENV === "development" ? { stack: error.stack } : {}),
    errors: error.errors,
  };

  res.status(status).json(response);
};
