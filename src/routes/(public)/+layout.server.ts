import { getSession } from "$lib/auth/server.ts";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ request }) => {
  const { user } = await getSession({
    headers: request.headers,
  }) ?? {};

  return {
    userType: user?.props.type ?? "guest" as const,
  };
};
