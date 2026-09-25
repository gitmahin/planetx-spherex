import express from "express";
import type { Express } from "express";
import requestIp from "request-ip";
import cookieParser from "cookie-parser";
import cors, { type CorsOptions } from "cors";

type ExpressServerConstructorTypes = {
  corsOptions?: CorsOptions;
  json_limit?: string;
  urlencode_json_limit?: string;
};

export class ExpressServer {
  private static app: Express;
  constructor({
    corsOptions,
    json_limit,
    urlencode_json_limit,
  }: ExpressServerConstructorTypes = {}) {
    if (!ExpressServer.app) {
      ExpressServer.app = express();
    }

    ExpressServer.app.use(
      cors(
        corsOptions
          ? { ...corsOptions }
          : {
              origin: "*",
              credentials: true,
            }
      )
    );

    ExpressServer.app
      .use(express.json({ limit: json_limit ?? "500kb" }))
      .use(
        express.urlencoded({
          extended: true,
          limit: urlencode_json_limit ?? "500kb",
        })
      )
      .use(cookieParser())
      .use(requestIp.mw());
  }

  GetApp() {
    return ExpressServer.app;
  }
}
