import { PrismaClient, type Job, type Organization } from "@prisma/client";

const prisma = new PrismaClient();

export default prisma;

export type NestedJob = Job & {
  organization: Pick<Organization, "name">;
};
