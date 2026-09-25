import "dotenv/config";

export type BaseConfigType = {
  PORT: number;
  NODE_ENV: string;
  DATABASE_URL: string;
};

export const baseConfig: BaseConfigType = {
  PORT: Number(process.env.PORT),
  NODE_ENV: process.env.NODE_ENV!,
  DATABASE_URL: process.env.DATABASE_URL!,
};
