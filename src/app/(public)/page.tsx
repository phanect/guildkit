import { JobList } from "@/components/JobList.tsx";
import { db } from "@/lib/db/db.ts";

export default async function Index() {
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

  return (
    <JobList jobs={jobs} />
  );
}
