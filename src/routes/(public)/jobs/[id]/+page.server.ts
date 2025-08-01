import { error } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import { db } from "$lib/db/db.ts";
import { jobTable } from "$lib/db/schema.ts";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params: { id }}) => {
  const jobs = await db.select().from(jobTable)
    .where(eq(jobTable.id, id))
    .limit(1);

  if (jobs.length <= 0) {
    return error(404);
  }

  return { job: jobs[0] };
};
