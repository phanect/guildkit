import { db } from "$lib/db/db.ts";

export const load = async () => {
  const today = new Date();
  const jobs = await db.query.job.findMany({
    columns: {
      id: true,
      title: true,
      description: true,
      createdAt: true,
      updatedAt: true,
    },
    with: {
      employer: {
        columns: {
          name: true,
        },
      },
    },
    where: (job, { gte }) => gte(job.expiresAt, today),
    orderBy: (job, { desc }) => [ desc(job.updatedAt) ],
  });

  return { jobs };
};
