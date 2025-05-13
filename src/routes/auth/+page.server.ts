import { getSession } from "$lib/auth.ts";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ request }) => {
  const { user } = await getSession({
    headers: request.headers,
  }) ?? {};

  if (user) {
    if (user.role === "candidate") {
      return redirect(307, "/");
    } else if (user.role === "recruiter" || user.role === "recruiterOrgAdmin") {
      return redirect(307, "/employer");
    } else if (user.role === "gkAdmin" || user.role === "siteAdmin") {
      return redirect(307, "/"); // TODO redirect to the better path
    }
  }
};
