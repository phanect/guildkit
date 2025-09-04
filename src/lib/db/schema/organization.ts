import { relations } from "drizzle-orm";
import { organization } from "./better-auth.ts";
import { job } from "./job.ts";
import { organizationsAndRecruitersRelationTable } from "./relations.ts";

export const organizationRelations = relations(organization, ({ many }) => ({
  recruiters: many(organizationsAndRecruitersRelationTable),
  jobs: many(job),
}));
