import { fail, redirect } from "@sveltejs/kit";
import { auth, requireAuthAs } from "$lib/auth.ts";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, request }) => {
  if (params.type !== "candidate" && params.type !== "recruiter") {
    return fail(404);
  }

  const { user } = await requireAuthAs("any", { request });

  if (user && !user.type) {
    await auth.api.updateUser({
      body: {
        type: params.type,
      },
      headers: request.headers,
    });
  }

  redirect(307, params.type === "recruiter" ? "/employer/jobs" : "/");
};
