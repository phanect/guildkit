import { superValidate } from "sveltekit-superforms/server";
import { organizationSchema } from "$lib/validation/organization.validation.ts";
import type { RequestEvent } from "@sveltejs/kit";

export const load = async (event: RequestEvent) => {
  const form = await superValidate(event, organizationSchema);
  return { form };
};
