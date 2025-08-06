import { fail, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import { eq } from "drizzle-orm";
import { requireAuthAs } from "$lib/auth/server.ts";
import { db } from "$lib/db/db.js";
import { job } from "$lib/db/schema/job.ts";
import { organization } from "$lib/db/schema/better-auth.ts";
import { jobSchema } from "$lib/validation/job.validation.ts";
import type { JobCardInfo } from "$lib/components/JobCard.svelte";
import type { PageServerLoad, RequestEvent } from "./$types";

export const load: PageServerLoad = async ({ parent }) => {
  const { user } = await parent();

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

  return {
    jobs,
    type: user.props.type,
  };
};

export const actions = {
  create: async (event: RequestEvent) => {
    const { user } = await requireAuthAs("recruiter", { request: event.request });
    const employerId = user?.id;

    if (!employerId) {
      return fail(401, {
        error: "Not authenticated as a recruiter.",
      });
    }

    const form = await superValidate(event, jobSchema);

    if (!form.valid) {
      return fail(400, { form });
    }

    const { expiresAt, ...newJob } = form.data;

    await db.insert(job).values({
      ...newJob,
      expiresAt: new Date(expiresAt),
      employer: employerId,
    });

    redirect(303, "/employer/jobs");
  },
  delete: async (event: RequestEvent) => {
    const data = await event.request.formData();
    const id = data.get("id");

    if (!id) {
      fail(400, { error: "`id` of the job to delete was not given." });
      return;
    }

    if (id instanceof File) {
      fail(400, { error: "`id` must not be a File." });
      return;
    }

    await db.delete(job).where(eq(job.id, id));
  },
};
