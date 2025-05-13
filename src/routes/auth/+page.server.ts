import { getSession } from "$lib/auth.ts";
import { redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { loginSchema } from "$lib/validation/user.validation.ts";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ request }) => {
  const { user } = await getSession({
    headers: request.headers,
  }) ?? {};

  if (user) {
    if (user.roles.includes("candidate")) {
      return redirect(307, "/");
    } else if (user.roles.includes("recruiter") || user.roles.includes("recruiterOrgOwner")) {
      return redirect(307, "/employer");
    } else if (user.roles.includes("siteOwner") || user.roles.includes("admin")) {
      return redirect(307, "/"); // TODO redirect to the better path
    }
  }

  const form = await superValidate(loginSchema);
  return { form };
};
