import { relations, type InferSelectModel } from "drizzle-orm";
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

export { currency, userTable };
export {
  session as sessionTable,
  account as accountTable,
  verification as verificationTable,
  organization as organizationTable,
  member as memberTable,
  invitation as invitationTable,
} from "../../../tmp/drizzle-schema/better-auth.ts";

export type User = InferSelectModel<typeof userTable>;

const timeLogs = {
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().$onUpdateFn(() => new Date()),
};

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
  currency: currency().notNull(),
  salaryPer: salaryPer().notNull(),
  company: text().notNull(),
  employerId: text().notNull().references(() => userTable.id),
  expiresAt: timestamp().notNull(),
  ...timeLogs,
});

export type Job = InferSelectModel<typeof jobTable>;

export const userType = pgEnum("UserType", [
  "administrative",
  "recruiter",
  "candidate",
]);

export const userPropsTable = pgTable("userProps", {
  id: uuid().primaryKey().notNull().defaultRandom(),
  type: userType(),
  ...timeLogs,
});

export const userPropRelations = relations(userTable, ({ one }) => ({
  props: one(userPropsTable, {
    fields: [ userTable.propsId ],
    references: [ userPropsTable.id ],
  }),
}));

export type UserProps = InferSelectModel<typeof userPropsTable>;
