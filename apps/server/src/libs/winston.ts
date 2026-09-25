import { createLogger, format, transports } from "winston";
import LokiTransport from "winston-loki";
import { baseConfig } from "@/config";

const jsonFormat = format.combine(
  format.timestamp(),
  format.errors({ stack: true }),
  format.json()
);

const options = {
  level: "info",
  format: jsonFormat,
  transports: [
    new LokiTransport({
      // Change the host with your ip to test localy
      host: "http://nebula-loki:3100",
      labels: { job: "nebula-server" },
      json: true,
      format: jsonFormat,
      replaceTimestamp: true,
      onConnectionError: (err) => console.error("Loki connection error:", err),
    }),
    ...(baseConfig.NODE_ENV !== "production"
      ? [new transports.Console({ format: jsonFormat })]
      : []),
  ],
};

export const logger = createLogger(options);
