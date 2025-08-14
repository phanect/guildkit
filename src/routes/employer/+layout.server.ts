import { error, redirect } from "@sveltejs/kit";
import { requireAuthAs } from "$lib/auth/server.ts";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ request }) => {
  const { user, session } = await requireAuthAs("recruiter", { request });

  if (!user || !session) {
    return redirect(303, "/auth");
  }

  if (!user.recruitsFor) {
    error(403, {
      message: "You are recruiter who does not belong to any organization. Ask your organization owner to invite, or create a new organization.",
      code: "RECRUITER_WITHOUT_ORG",
    });
  }

  return {
    user,
    session,
  };
};
