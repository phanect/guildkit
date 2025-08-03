import {
  pgTable,
  text,
  uuid,
  primaryKey,
} from "drizzle-orm/pg-core";
import { job } from "./job.ts";
import { user } from "./better-auth.ts";

export const jobAndUserRelationTable = pgTable("jobsAndCandidatesRelation", {
  appliedJobId: uuid().notNull().references(() => job.id),
  candidateId: text().notNull().references(() => user.id),
}, (t) => [ primaryKey({ columns: [ t.appliedJobId, t.candidateId ]}) ]);
