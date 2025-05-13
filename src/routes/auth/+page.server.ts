import { auth } from "$lib/auth.ts";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ request }) => {
  const { user } = await auth.api.getSession({
    headers: request.headers,
  }) ?? {};

  if (user) {
    if (user.type === "candidate") {
      return redirect(307, "/");
    } else if (user.type === "recruiter") {
      return redirect(307, "/employer");
    } else if (user.type === "administrative") {
      return redirect(307, "/"); // TODO redirect to the better path
    }
  }
};
