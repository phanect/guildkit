import { createAccessControl } from "better-auth/plugins/access";

export const ac = createAccessControl({
  project: [ "create", "share", "update", "delete" ],
} as const);

export const roles = {
  /** Role for the GuildKit admins. They can control everything. */
  admin: ac.newRole({
    project: [ "create", "update" ],
  }),
  /** Role for the owners of the each job search websites built by GuildKit. They can control everything in their own job search service(s). */
  siteOwner: ac.newRole({
    project: [],
  }),
  /** Role for the owners of the each organizations. They can control everything in their organization(s). */
  recruiterOrgOwner: ac.newRole({
    project: [],
  }),
  /** Role for the candidate users */
  candidate: ac.newRole({
    project: [],
  }),
  /** Role for the recruiter users. */
  recruiter: ac.newRole({
    project: [],
  }),
  /** Default user role. They can do nothing and have to set their role first. */
  user: ac.newRole({
    project: [],
  }),
};

export type Role = keyof typeof roles;
export type SignUpRole = "candidate" | "recruiter";
