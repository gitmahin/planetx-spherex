import "dotenv/config";
import * as t from "drizzle-orm/pg-core";

// Table Timestamps
export const table_timestamps = {
  updated_at: t.timestamp({ withTimezone: true }).$onUpdateFn(() => new Date()),
  created_at: t
    .timestamp({ withTimezone: true })
    .notNull()
    .$defaultFn(() => new Date()),
};
