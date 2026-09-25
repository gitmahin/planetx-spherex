import { createLogger, format, Logger, transports } from "winston";
import LokiTransport from "winston-loki";

const jsonFormat = format.combine(
  format.timestamp(),
  format.errors({ stack: true }),
  format.json()
);

export const createWinstonLogger = (
  lokiHostUrl: string,
  NodeEnv: string
): Logger => {
  const options = {
    level: "info",
    format: jsonFormat,
    transports: [
      new LokiTransport({
        // Change the host with your ip to test localy
        host: lokiHostUrl,
        labels: { job: "nebula-server" },
        json: true,
        format: jsonFormat,
        replaceTimestamp: true,
        onConnectionError: (err) =>
          console.error("Loki connection error:", err),
      }),
      ...(NodeEnv !== "production"
        ? [new transports.Console({ format: jsonFormat })]
        : []),
    ],
  };

  return createLogger(options) as Logger;
};
