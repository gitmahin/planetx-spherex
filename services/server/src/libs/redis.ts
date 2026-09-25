import { RedisConfig } from "@/config";
import { createClient, type RedisClientType } from "redis";

/**
 * Factory function to initialize a high-performance Redis client.
 *
 * @param username - Redis ACL username.
 * @param password - Redis ACL password.
 * @param host - Redis server hostname or IP.
 * @param port - Redis server port.
 *
 * @returns {RedisClientType} A configured Redis client instance.
 *
 * @remarks
 * **Key Architectural Decisions:**
 * 1. `disableOfflineQueue`: Set to true to prevent memory bloat and stale command execution
 *    if the connection drops. We prefer "fail-fast" behavior in crisis scenarios.
 * 2. `reconnectStrategy`: Implements exponential backoff with random jitter to prevent
 *    synchronized reconnection attempts (Thundering Herd).
 */
const createRedisClient = (
  REDIS_USERNAME: string,
  REDIS_PASS: string,
  REDIS_HOST: string,
  REDIS_PORT: number
): RedisClientType => {
  return createClient({
    username: REDIS_USERNAME,
    password: REDIS_PASS,
    disableOfflineQueue: true, // disable queuing data when connection is down.
    socket: {
      host: REDIS_HOST,
      port: Number(REDIS_PORT),
      reconnectStrategy: (retries: number) => {
        // Generate a random jitter between 0 – 100 ms:
        const jitter = Math.floor(Math.random() * 100);

        // Delay is an exponential backoff, (2^retries) * 50 ms, with a
        // maximum value of 3000 ms:
        const delay = Math.min(Math.pow(2, retries) * 50, 3000);

        return delay + jitter;
      },
      connectTimeout: 10000, // in milliseconds

      // tls: true,
      // key: fs.readFileSync('./redis_user_private.key'),
      // cert: fs.readFileSync('./redis_user.crt'),
      // ca: [fs.readFileSync('./redis_ca.pem')]
    },
  });
};

export const redisClient: RedisClientType = createRedisClient(
  RedisConfig.REDIS_USERNAME,
  RedisConfig.REDIS_PASS,
  RedisConfig.REDIS_HOST,
  RedisConfig.REDIS_PORT
);

redisClient.on("error", (err: unknown) =>
  console.log("Redis Client Error", err)
);

redisClient.on("reconnecting", () =>
  console.log(
    "The client is about to try reconnecting after the connection was lost due to an error."
  )
);

export async function connectRedis() {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
}
