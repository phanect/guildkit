import { fail, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import { eq } from "drizzle-orm";
import { requireAuthAs } from "$lib/auth.ts";
import { db } from "$lib/db/db.js";
import { jobTable } from "$lib/db/schema.js";
import { jobSchema } from "$lib/validation/job.validation.ts";
import type { PageServerLoad, RequestEvent } from "./$types";

export const load: PageServerLoad = async ({ parent }) => {
  const { user } = await parent();

  return {
    jobs: await db.select().from(jobTable).where(eq(jobTable.employerId, user.id)),
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

    await db.insert(jobTable).values({
      ...form.data,
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

    await db.delete(jobTable).where(eq(jobTable.id, id));
  },
};
