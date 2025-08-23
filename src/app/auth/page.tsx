import { getSession } from "$lib/auth/server.ts";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ request }) => {
  const { user } = await getSession({
    headers: request.headers,
  }) ?? {};

  if (user) {
    if (user.props.type === "candidate") {
      return redirect(307, "/");
    } else if (user.props.type === "recruiter") {
      return redirect(307, "/employer");
    } else if (user.props.type === "administrative") {
      return redirect(307, "/"); // TODO redirect to the better path
    }
  }
};
