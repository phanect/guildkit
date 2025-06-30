import { type InferInsertModel } from "drizzle-orm";
import {
  pgTable,
  timestamp,
  text,
  integer,
  uuid,
  pgEnum,
} from "drizzle-orm/pg-core";
import { currency } from "../../../tmp/drizzle-schema/currencies.ts";
import { user } from "../../../tmp/drizzle-schema/better-auth.ts";

export * from "../../../tmp/drizzle-schema/better-auth.ts";

export type User = InferInsertModel<typeof user>;

export const salaryPer = pgEnum("SalaryPer", [
  "YEAR",
  "MONTH",
  "DAY",
  "HOUR",
]);

export const job = pgTable("Jobs", {
  id: uuid().primaryKey().notNull().defaultRandom(),
  title: text().notNull(),
  description: text().notNull(),
  requirements: text().notNull(),
  applicationUrl: text().notNull(),
  location: text().notNull(),
  salary: integer().notNull(),
  currency: currency(),
  salaryPer: salaryPer(),
  company: text().notNull(),
  employerId: uuid().notNull().references(() => user.id),
  expiresAt: timestamp(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().$onUpdateFn(() => new Date()),
});

export type Job = InferInsertModel<typeof job>;

export const userType = pgEnum("UserType", [
  "administrative",
  "recruiter",
  "candidate",
]);
