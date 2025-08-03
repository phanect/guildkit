import { timestamp } from "drizzle-orm/pg-core";

export const timeLogs = {
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().$onUpdateFn(() => new Date()),
};
