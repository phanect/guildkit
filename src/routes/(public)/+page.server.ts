import { db } from "$lib/db/db.ts";
import { jobTable, type Job } from "$lib/db/schema.ts";
import { gte } from "drizzle-orm";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad<{ jobs: Job[]; }> = async () => {
  const today = new Date();
  const response = await db.select().from(jobTable).where(gte(jobTable.expiresAt, today));
  return { jobs: response };
};
