import Link from "next/link";
import { JobList } from "@/components/JobList.ts";
import { requireAuthAs } from "@/lib/auth/server.ts";
import { db } from "@/lib/db/db.ts";
import { organization } from "@/lib/db/schema/better-auth.ts";
import theme from "@/styles/button-linktext.module.scss";
import type { JobCardInfo } from "@/components/JobCard.tsx";
import styles from "./page.module.scss";
import type { ReactElement } from "react";

export const EmployerJobsPage = async (): Promise<ReactElement> => {
  const { user } = await requireAuthAs("recruiter");

  const jobs: JobCardInfo[] = await db.query.job.findMany({
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
          id: true,
          name: true,
        },
        with: {
          recruiters: {
            columns: {
              recruitsFor: true,
            },
            where: (recruiter, { eq }) => eq(recruiter.id, user.id),
          },
        },
      },
    },
    where: (job, { eq }) => eq(job.employer, organization.id),
    orderBy: (job, { desc }) => [ desc(job.updatedAt) ],
  });

  const editable = user.props.type === "recruiter";

  return (
    <div className={styles.container}>
      <section className={styles.buttonSection}>
        <Link href="/employer/jobs/new" className={theme.buttonDeep}>
          Add job
        </Link>
      </section>

      <JobList jobs={jobs} editable={editable} />
    </div>
  );
};
