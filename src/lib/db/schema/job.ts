import { relations, type InferSelectModel } from "drizzle-orm";
import {
  pgTable,
  timestamp,
  text,
  integer,
  uuid,
  pgEnum,
} from "drizzle-orm/pg-core";
import { currency } from "./currencies.ts";
import { user } from "./better-auth.ts";
import { jobAndUserRelationTable } from "./relations.ts";
import { timeLogs } from "../schema-utils.ts";

export const salaryPer = pgEnum("SalaryPer", [
  "YEAR",
  "MONTH",
  "DAY",
  "HOUR",
]);

export const job = pgTable("job", {
  id: uuid().primaryKey().notNull().defaultRandom(),
  title: text().notNull(),
  description: text().notNull(),
  requirements: text().notNull(),
  applicationUrl: text().notNull(),
  location: text().notNull(),
  salary: integer().notNull(),
  currency: currency().notNull(),
  salaryPer: salaryPer().notNull(),
  company: text().notNull(),
  employerId: text().notNull().references(() => user.id),
  expiresAt: timestamp().notNull(),
  ...timeLogs,
});
export const jobRelations = relations(job, ({ many }) => ({
  candidates: many(jobAndUserRelationTable),
}));

export type Job = InferSelectModel<typeof job>;
