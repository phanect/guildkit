import { relations, type InferSelectModel } from "drizzle-orm";
import {
  pgTable,
  timestamp,
  text,
  integer,
  uuid,
  pgEnum,
  primaryKey,
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

export const jobAndUserRelationTable = pgTable("jobsAndCandidatesRelation", {
  appliedJobId: uuid().notNull().references(() => jobTable.id),
  candidateId: text().notNull().references(() => userTable.id),
}, (t) => [ primaryKey({ columns: [ t.appliedJobId, t.candidateId ]}) ]);
export const jobAndUserRelation1 = relations(jobTable, ({ many }) => ({
  jobsToCandidates: many(jobAndUserRelationTable),
}));
export const jobAndUserRelation2 = relations(userTable, ({ many }) => ({
  usersToGroups: many(jobAndUserRelationTable),
}));

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
