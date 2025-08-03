import { db } from "$lib/db/db.ts";
import { job, type Job } from "$lib/db/schema/job.ts";
import { gte } from "drizzle-orm";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad<{ jobs: Job[]; }> = async () => {
  const today = new Date();
  const response = await db.select().from(job).where(gte(job.expiresAt, today));
  return { jobs: response };
};
