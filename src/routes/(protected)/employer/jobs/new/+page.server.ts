import { superValidate } from "sveltekit-superforms/server";
import { jobSchema } from "$lib/validation/job.validation.ts";
import type { RequestEvent } from "@sveltejs/kit";

export const load = async (event: RequestEvent) => {
  const form = superValidate(event, jobSchema);
  return { form };
};
