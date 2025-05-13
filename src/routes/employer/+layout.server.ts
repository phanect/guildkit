import { redirect } from "@sveltejs/kit";
import { requireAuthAs } from "$lib/auth.ts";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals, request }) => {
  const { user, session } = await requireAuthAs("RECRUITER", { locals, request });

  if (!user || !session) {
    return redirect(303, "/auth");
  }
};
