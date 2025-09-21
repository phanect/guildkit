import { relations } from "drizzle-orm";
import { organization } from "./better-auth.ts";
import { job } from "./job.ts";

export const organizationRelations = relations(organization, ({ many }) => ({
  jobs: many(job),
}));
