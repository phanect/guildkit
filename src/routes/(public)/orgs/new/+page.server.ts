import { superValidate } from "sveltekit-superforms/server";
import { requireAuthAs } from "$lib/auth/server.ts";
import { organizationSchema } from "$lib/validation/organization.validation.ts";
import type { RequestEvent } from "@sveltejs/kit";

export const load = async (event: RequestEvent) => {
  await requireAuthAs("recruiter", {
    request: event.request,
  });

  const form = await superValidate(event, organizationSchema);
  return { form };
};
