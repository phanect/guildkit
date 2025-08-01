import { getSession } from "$lib/auth.ts";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ request }) => {
  const session = await getSession({
    headers: request.headers,
  });

  return {
    isLoggedIn: !!session,
  };
};
