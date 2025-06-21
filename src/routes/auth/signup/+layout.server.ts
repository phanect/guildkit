import { redirect } from "@sveltejs/kit";
import { requireAuthAs, roleConfigured } from "$lib/auth.ts";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ request }) => {
  const { user } = await requireAuthAs("any", { request }) ?? {};

  if (roleConfigured(user.roles)) {
    return redirect(302, (user.roles.includes("recruiterOrgOwner") || user.roles.includes("recruiter"))
      ? "/employer"
      : "/"
    );
  }
};
