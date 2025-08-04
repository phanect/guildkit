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
import { user } from "../../../tmp/drizzle-schema/better-auth.ts";

export { currency };
export * from "../../../tmp/drizzle-schema/better-auth.ts";

export type User = InferSelectModel<typeof user>;

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

export type Job = InferSelectModel<typeof job>;

export const jobAndUserRelationTable = pgTable("jobsAndCandidatesRelation", {
  appliedJobId: uuid().notNull().references(() => job.id),
  candidateId: text().notNull().references(() => user.id),
}, (t) => [ primaryKey({ columns: [ t.appliedJobId, t.candidateId ]}) ]);
export const jobAndUserRelation1 = relations(job, ({ many }) => ({
  jobsToCandidates: many(jobAndUserRelationTable),
}));
export const jobAndUserRelation2 = relations(user, ({ many }) => ({
  usersToGroups: many(jobAndUserRelationTable),
}));

export const userType = pgEnum("UserType", [
  "administrative",
  "recruiter",
  "candidate",
]);

export const userProps = pgTable("userProps", {
  id: uuid().primaryKey().notNull().defaultRandom(),
  type: userType(),
  ...timeLogs,
});

export const userPropRelations = relations(user, ({ one }) => ({
  props: one(userProps, {
    fields: [ user.propsId ],
    references: [ userProps.id ],
  }),
}));

export type UserProps = InferSelectModel<typeof userProps>;
