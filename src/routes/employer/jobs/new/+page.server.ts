import { superValidate } from "sveltekit-superforms/server";
import { jobSchema } from "$lib/validation/job.validation.ts";
import { fail, type RequestEvent } from "@sveltejs/kit";
import { requireAuthAs } from "$lib/auth/server.ts";

export const load = async (event: RequestEvent) => {
  const { user: recruiter } = await requireAuthAs("recruiter", { request: event.request });

  if (!recruiter.recruitsFor) {
    return fail(403, { error: "You cannot create jobs until you belong to an organization." });
  }

  const form = await superValidate(event, jobSchema);
  return { form };
};
