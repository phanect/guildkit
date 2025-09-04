import { relations } from "drizzle-orm";
import { organization, user } from "./better-auth.ts";
import { job } from "./job.ts";

export const organizationRelations = relations(organization, ({ many }) => ({
  recruiters: many(user),
  jobs: many(job),
}));
