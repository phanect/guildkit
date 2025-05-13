import { redirect } from "@sveltejs/kit";
import { requireAuthAs } from "$lib/auth.ts";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ request }) => {
  const { user, session } = await requireAuthAs("recruiter", { request });

  if (!user || !session) {
    return redirect(303, "/auth");
  }

  return {
    user,
    session,
  };
};
