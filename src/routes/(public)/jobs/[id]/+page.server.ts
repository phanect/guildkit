import { error } from "@sveltejs/kit";
import { db } from "$lib/db/db.ts";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params: { id }}) => {
  const job = await db.query.job.findFirst({
    columns: {
      id: true,
      title: true,
      description: true,
      location: true,
      salary: true,
      salaryPer: true,
      currency: true,
      applicationUrl: true,
      requirements: true,
      createdAt: true,
      updatedAt: true,
    },
    with: {
      employer: {
        columns: {
          slug: true,
          name: true,
        },
      },
    },
    where: (job, { eq }) => eq(job.id, id),
    orderBy: (job, { desc }) => [ desc(job.updatedAt) ],
  });

  if (!job) {
    return error(404);
  }

  return { job };
};
