import type { Logger } from "pino";
import pino, { type HttpLogger, type Options } from "pino-http";

const config: Options = {
  transport: {
    targets: [
      {
        target: "pino-pretty",
        level: "debug",
        options: {
          colorize: true,
          levelFirst: true,
          translateTime: "SYS:standard",
          messageFormat:
            "{method} {url} {statusCode} {responseTime} [{responseMessage}]",
          singleLine: true,
        },
      },
    ],
  },
};

class PinoLogger {
  private logger: HttpLogger | null = null;

  createLogger(options: Options = {}): Logger | null {
    if (process.env.NODE_ENV === "production") {
      return null;
    }

    if (!this.logger) {
      this.logger = pino({ ...config, ...options });
    }
    return this.logger.logger;
  }
}

export const pinoLogger = new PinoLogger();
