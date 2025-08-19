import { error, redirect } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import { auth } from "$lib/auth.ts";
import { db } from "$lib/db/db.ts";
import { userProps } from "$lib/db/schema/user.ts";
import type { User, Session } from "./types.ts";

export const requireAuthAs = async (
  expectedType: User["props"]["type"] | "any",
  { request }: { request: Request; },
): Promise<{ user: User; session: Session; }> => {
  const reqURL = new URL(request.url);

  const { user, session } = await getSession({
    headers: request.headers,
  }) ?? {};

  if (!user || !session) {
    return redirect(303, "/auth");
  }

  if (!user.props.type) {
    if (reqURL.pathname.startsWith("/auth/signup/")) {
      return { user, session };
    } else {
      return redirect(302, "/auth/signup/candidate");
    }
  }

  if (expectedType === "any" || expectedType === user.props.type) {
    return { user, session };
  } else {
    return error(401, { message: `This page is for the ${ expectedType }s.` });
  }
};

export const getSession = async (...args: Parameters<typeof auth.api.getSession>) => {
  const { user, session } = await auth.api.getSession(...args) ?? {};

  if (!user) {
    return;
  }

  const props = await db.select().from(userProps)
    .where(eq(userProps.id, user?.propsId))
    .limit(1);

  return {
    user: {
      ...user,
      props: props[0],
    },
    session,
  };
};
