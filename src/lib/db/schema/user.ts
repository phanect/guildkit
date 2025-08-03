import { relations, type InferSelectModel } from "drizzle-orm";
import {
  pgTable,
  uuid,
  pgEnum,
} from "drizzle-orm/pg-core";
import { user } from "./better-auth.ts";
import { timeLogs } from "../schema-utils.ts";
import { jobAndUserRelationTable } from "./relations.ts";

export const userRelations = relations(user, ({ one, many }) => ({
  props: one(userProps, {
    fields: [ user.propsId ],
    references: [ userProps.id ],
  }),
  appliedJobs: many(jobAndUserRelationTable),
}));

export type User = InferSelectModel<typeof user>;

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

export type UserProps = InferSelectModel<typeof userProps>;
