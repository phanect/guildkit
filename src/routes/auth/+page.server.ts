import { auth } from "$lib/auth.ts";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ request }) => {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (session) {
    if (session.user.role === "CANDIDATE") {
      return redirect(307, "/");
    } else if (session.user.role === "RECRUITER") {
      return redirect(307, "/employer");
    } else if (session.user.role === "ADMIN") {
      return redirect(307, "/"); // TODO redirect to the better path
    }
  }
};
