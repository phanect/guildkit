import { fail, redirect } from "@sveltejs/kit";
import { requireAuthAs } from "$lib/auth.ts";
import { updateUserProps } from "$lib/db/db.ts";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, request }) => {
  if (params.type !== "candidate" && params.type !== "recruiter") {
    return fail(404);
  }

  const { user } = await requireAuthAs("any", { request });

  if (user && !user.props.type) {
    await updateUserProps({ user })
      .set({ type: params.type });
  }

  redirect(307, params.type === "recruiter" ? "/employer/jobs" : "/");
};
