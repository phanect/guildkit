import { relations, type InferInsertModel } from "drizzle-orm";
import {
  pgTable,
  timestamp,
  text,
  integer,
  uuid,
  pgEnum,
} from "drizzle-orm/pg-core";
import { currency } from "../../../tmp/drizzle-schema/currencies.ts";
import { user as userTable } from "../../../tmp/drizzle-schema/better-auth.ts";

export {
  user as userTable,
  session as sessionTable,
  account as accountTable,
  verification as verificationTable,
  organization as organizationTable,
  member as memberTable,
  invitation as invitationTable,
} from "../../../tmp/drizzle-schema/better-auth.ts";

export type User = InferInsertModel<typeof userTable>;

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
  currency: currency(),
  salaryPer: salaryPer(),
  company: text().notNull(),
  employerId: uuid().notNull().references(() => userTable.id),
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

export const userPropTable = pgTable("userProps", {
  id: uuid().primaryKey().notNull().defaultRandom(),
  type: userType(),
});

export const userPropRelations = relations(userTable, ({ one }) => ({
  props: one(userPropTable, {
    fields: [ userTable.propId ],
    references: [ userPropTable.id ],
  }),
}));

export type UserProp = InferInsertModel<typeof userPropTable>;
