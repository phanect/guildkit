import { error } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import { db } from "$lib/db/db.ts";
import { job } from "$lib/db/schema.ts";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params: { id }}) => {
  const jobs = await db.select().from(job)
    .where(eq(job.id, id))
    .limit(1);

  if (jobs.length <= 0) {
    return error(404);
  }

  return { job: jobs[0] };
};
