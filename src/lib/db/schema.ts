import { type InferInsertModel } from "drizzle-orm";
import {
  pgTable,
  timestamp,
  text,
  integer,
  uuid,
  pgEnum,
} from "drizzle-orm/pg-core";

export const salaryPer = pgEnum("SalaryPer", [
  "YEAR",
  "MONTH",
  "DAY",
  "HOUR",
]);

export const jobTable = pgTable("Jobs", {
  id: uuid().primaryKey().notNull().defaultRandom(),
  title: text().notNull(),
  description: text().notNull(),
  requirements: text().notNull(),
  applicationUrl: text().notNull(),
  location: text().notNull(),
  salary: integer().notNull(),
  // TODO currency: currency(),
  salaryPer: salaryPer(),
  company: text().notNull(),
  employerId: uuid().notNull(),
  expiresAt: timestamp(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().$onUpdateFn(() => new Date()),
});

export type Job = InferInsertModel<typeof jobTable>;

export const userType = pgEnum("UserType", [
  "administrative",
  "recruiter",
  "candidate",
]);
