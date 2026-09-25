import { baseConfig } from "@/config";
import { logger, pinoLogger } from "@/libs";
import type { NextFunction, Request, Response } from "express";

/**
 * Middleware factory that creates a high-performance request logger.
 *
 * This logger captures detailed metadata for every HTTP transaction,
 * including high-resolution response timing and error context.
 *
 * @returns {Function} Express middleware function.
 */
export const requestLogger = () => {
  const plogger = pinoLogger.createLogger();

  return (req: Request, res: Response, next: NextFunction) => {
    const startTime = process.hrtime();

    res.on("finish", () => {
      const [seconds, nanoseconds] = process.hrtime(startTime);
      const responseTime = (seconds * 1000 + nanoseconds / 1e6).toFixed(2);

      const logData = {
        method: req.method,

        url: req.url,
        path: req.path,

        query: req.query,
        params: req.params,

        ip: req.ip || req.get("x-forwarded-for"),
        userAgent: req.get("user-agent"),
        referer: req.get("referer"),
        host: req.get("host"),

        statusCode: res.statusCode,
        responseTime: `${responseTime}ms`,
        responseMessage: res.statusMessage as string,
        errorMessage:
          res.statusCode >= 400
            ? {
                title: res.locals.errorTitle,
                message: res.locals.errorMessage,
                code: res.locals.errorCode,
                errors: res.locals.errors,
              }
            : undefined,
      };

      if (res.statusCode >= 400) {
        plogger?.error(logData);
        logger.error(logData);
      } else if (res.statusCode >= 300 && res.statusCode < 400) {
        plogger?.silent(logData);
      }
      plogger?.info(logData);
      logger.info(logData);
    });

    next();
  };
};
