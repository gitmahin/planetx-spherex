// ┌─────────────────────────┐
// │ Base Imports            │
// └─────────────────────────┘
import { rateLimit } from "express-rate-limit";
import { RedisStore } from "rate-limit-redis";
import { ApiResponse, connectRedis, redisClient } from "./libs";
import { errorHandlerMiddleware, requestLogger } from "./middlewares";
import { baseConfig } from "./config";
import { ExpressServer } from "./server";
import { pgDb } from "./libs/db.connect";
import { sql } from "drizzle-orm";
import promClient from "@prometheus-io/client";
import { container } from "./container";
import { ApiRouter } from "./routes";

/* -------------------------------------------------------------------------- */
/*                                 Metrics                                    */
/* -------------------------------------------------------------------------- */
const collectDefaultMetrics = promClient.collectDefaultMetrics;
const Registry = promClient.Registry;
const register = new Registry();
collectDefaultMetrics({ register });

/* -------------------------------------------------------------------------- */
/*                               Create Server                                */
/* -------------------------------------------------------------------------- */
const server = new ExpressServer();
const app = server.GetApp();

app.use(requestLogger());

/* -------------------------------------------------------------------------- */
/*                                 Rate Limiter                               */
/* -------------------------------------------------------------------------- */
await connectRedis();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 1000,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  ipv6Subnet: 56,
  passOnStoreError: false,
  skip: () => baseConfig.NODE_ENV === "test",
  store: new RedisStore({
    sendCommand: (...args: string[]) => redisClient.sendCommand(args),
  }),
});
app.use(limiter);

/* -------------------------------------------------------------------------- */
/*                                   Routes                                   */
/* -------------------------------------------------------------------------- */

const apiRouter = container.get(ApiRouter);
apiRouter.createRouters();
app.use("/api", apiRouter.getRouters());
app.get("/health", async (_, res) => {
  return res.status(200).json(new ApiResponse(200, "OK"));
});

app.get("/metrics", async (_req, res) => {
  try {
    res.set("Content-Type", register.contentType);
    res.end(await register.metrics());
  } catch (err) {
    res.status(500).end(err);
  }
});

/* -------------------------------------------------------------------------- */
/*                          Error Handler Middleware                          */
/* -------------------------------------------------------------------------- */
app.use(errorHandlerMiddleware);

// Start Server
app.listen(baseConfig.PORT, async () => {
  const result = await pgDb.execute(sql`select now()`);
  console.log(`                                     
               █             ███          
 ██   █        █               █          
 ██░  █        █               █          
 █▒▓  █  ███   █▓██   █   █    █    ░███░ 
 █ █  █ ▓▓ ▒█  █▓ ▓█  █   █    █    █▒ ▒█ 
 █ ▓▓ █ █   █  █   █  █   █    █        █ 
 █  █ █ █████  █   █  █   █    █    ▒████ 
 █  ▓▒█ █      █   █  █   █    █    █▒  █ 
 █  ░██ ▓▓  █  █▓ ▓█  █▒ ▓█    █░   █░ ▓█ 
 █   ██  ███▒  █▓██   ▒██▒█    ▒██  ▒██▒█     
 Listening...                  Port: ${baseConfig.PORT}`);
  console.log(" Database: ", result.rows[0]!.now ? "Working ✅" : "ᶻ 𝗓 𐰁");
  console.log(
    " Redis: ",
    (await redisClient.ping()) === "PONG" ? "Working ✅" : "ᶻ 𝗓 𐰁"
  );
});
