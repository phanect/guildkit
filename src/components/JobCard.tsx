"use client";

import { useActionState, useEffect } from "react";
import { deleteJob } from "@/lib/actions/jobs.ts";
import { Link } from "@/components/generic/ButtonLink.tsx";
import styles from "./JobCard.module.scss";
import type { Organization } from "better-auth/plugins";
import type { Job } from "../lib/db/schema/job.ts";

export type JobCardInfo = Pick<Job, "id" | "title" | "description" | "createdAt" | "updatedAt"> & {
  employer: Pick<Organization, "name">;
};

type JobCardProps = {
  job: JobCardInfo;
  editable?: boolean;
};

export const JobCard = ({ job, editable = false }: JobCardProps) => {
  const [ state, formAction, pending ] = useActionState(deleteJob, {});

  useEffect(() => {
    if (state.error) {
      alert(state.error);
    }
  }, [ state.error ]);

  return (
    <div className={styles.card}>
      <a className={styles.cardLink} href={`/jobs/${ job.id }`}>
        <h3 className={styles.cardTitle}>
          {job.title}
        </h3>
        <div className={styles.cardDesc}>
          {job.description}
        </div>
      </a>

      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

      <div className={styles.actions}>
        <div className={styles.company}>
          {job.employer.name}
        </div>

        <div className={styles.actionsRight}>
          <div>
            Last update: {(job.updatedAt ?? job.createdAt).toLocaleDateString()}
          </div>

          {editable && (
            <form className="flex items-end gap-2">
              <Link href={`/employer/jobs/edit/${ job.id }`} theme="button-pale" prefetch>
                Edit
              </Link>
              <input type="hidden" name="id" value={job.id} />
              <button formAction={formAction} className={styles.buttonPale} disabled={pending}>
                Delete
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
