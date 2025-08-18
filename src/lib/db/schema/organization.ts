import { relations, type InferSelectModel } from "drizzle-orm";
import { pgTable, text, integer } from "drizzle-orm/pg-core";
import { currency } from "./currencies.ts";
import { organization } from "./better-auth.ts";
import { timeLogs, randomId } from "../schema-utils.ts";
import { job } from "./job.ts";

export const organizationRelations = relations(organization, ({ one, many }) => ({
  props: one(orgProps, {
    fields: [ organization.propsId ],
    references: [ orgProps.id ],
  }),
  jobs: many(job),
}));

export const orgProps = pgTable("orgProps", {
  id: integer().primaryKey().notNull().$defaultFn(() => randomId()),
  about: text(),
  url: text().notNull().unique(),
  emails: text().array(),
  addresses: text().array().notNull(),
  currencies: currency().array().notNull(),
  ...timeLogs,
});

export type OrgProps = InferSelectModel<typeof orgProps>;
