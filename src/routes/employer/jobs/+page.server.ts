import { fail, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import { eq } from "drizzle-orm";
import { requireAuthAs } from "$lib/auth/server.ts";
import { db } from "$lib/db/db.js";
import { job } from "$lib/db/schema/job.ts";
import { jobSchema } from "$lib/validation/job.validation.ts";
import type { PageServerLoad, RequestEvent } from "./$types";

export const load: PageServerLoad = async ({ parent }) => {
  const { user } = await parent();

  return {
    jobs: await db.select().from(job).where(eq(job.employerId, user.id)),
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
      employerId,
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
