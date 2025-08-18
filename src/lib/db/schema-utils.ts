import { timestamp } from "drizzle-orm/pg-core";

export const timeLogs = {
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().$onUpdateFn(() => new Date()),
};

/**
 * @returns A pseudo-random number less than 2,147,483,647 (Max number of integer)
 */
export const randomId = () => Math.floor(Math.random() * 2147483647);
