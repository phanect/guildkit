import { PrismaClient, type Job, type Organization } from "@prisma/client";

export const prisma = new PrismaClient();

export type NestedJob = Job & {
  organization: Pick<Organization, "name">;
};
