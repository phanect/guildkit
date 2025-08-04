import {
  pgTable,
  text,
  uuid,
  primaryKey,
} from "drizzle-orm/pg-core";
import { job } from "./job.ts";
import { organization, user } from "./better-auth.ts";

export const jobsAndUsersRelationTable = pgTable("jobsAndCandidatesRelation", {
  appliedJobId: uuid().notNull().references(() => job.id),
  candidateId: text().notNull().references(() => user.id),
}, (t) => [ primaryKey({ columns: [ t.appliedJobId, t.candidateId ]}) ]);

export const organizationsAndRecruitersRelationTable = pgTable("organizationAndRecruiterRelation", {
  organizationId: text().notNull().references(() => organization.id),
  recruiterId: text().notNull().references(() => user.id),
}, (t) => [ primaryKey({ columns: [ t.organizationId, t.recruiterId ]}) ]);
