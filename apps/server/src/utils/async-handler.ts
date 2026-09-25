import type { NextFunction, RequestHandler, Request, Response } from "express";

/**
 * A Higher-Order Function (HOF) that wraps asynchronous Express route handlers.
 *
 * This utility ensures that any errors thrown within an `async` function—or any
 * rejected promises—are properly caught and forwarded to the global
 * `errorHandlerMiddleware` via the `next()` callback.
 *
 * @param requestHandlerFn - The asynchronous Express middleware or controller function.
 * @returns A standard Express RequestHandler that is "exception-safe."
 *
 * @example
 * // Without asyncHandler, you'd need a try/catch in every route:
 * router.get("/data", asyncHandler(async (req, res) => {
 *   const data = await db.fetch(); // If this fails, next(err) is called automatically
 *   res.json(data);
 * }));
 */
export const asyncHandler = (requestHandlerFn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    /**
     * Promise.resolve(value) is used here to handle both:
     * 1. Functions that are explicitly marked 'async' (returning a Promise).
     * 2. Standard synchronous functions that might throw an error.
     *
     * If a rejection occurs, .catch(err => next(err)) bridges the error
     * to the centralized error handler.
     */
    Promise.resolve(requestHandlerFn(req, res, next)).catch((err) => next(err));
  };
};
