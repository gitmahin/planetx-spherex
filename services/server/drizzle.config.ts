import { baseConfig } from "@/config";
import dotenv from "dotenv";

// Run NODE_ENV=production pnpm db:migrate
// When you are previewing production via docker-compose
dotenv.config({
  path:
    baseConfig.NODE_ENV === "production" ? "./.env.production.local" : "./.env",
});

import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/database/schemas/index.ts",
  out: "./src/database/migrations",
  verbose: true,
  strict: true,
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  migrations: {
    schema: "public",
  },
  introspect: {
    casing: "preserve",
  },
});
