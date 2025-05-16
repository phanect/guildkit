import { error, redirect } from "@sveltejs/kit";
import { auth, requireAuthAs } from "$lib/auth.ts";
import { admin } from "$lib/auth/client.ts";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ request }) => {
  const { user } = await requireAuthAs("any", { request }) ?? {};

  if (user.roles.includes("user") || user.roles.length <= 0) {
    return;
  }

  return redirect(302, (user.roles.includes("recruiterOrgOwner") || user.roles.includes("recruiter"))
    ? "/employer"
    : "/"
  );
};

export const actions: Actions = {
  setRole: async ({ request }) => {
    const role = (await request.formData()).get("role");

    if (typeof role !== "string") {
      return error(400, "`role` must be given as a string format");
    }

    if (role !== "candidate" && role !== "recruiter") {
      return error(400, "`role` must be `candidate` or `recruiter`");
    }

    const { user } = await auth.api.getSession({
      headers: request.headers,
    }) ?? {};

    if (!user) {
      return error(401, "Not authenticated yet.");
    }

    await admin.setRole({
      userId: user.id,
      role,
    });
  },
};
