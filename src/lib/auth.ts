import { env } from "node:process";
import { error, redirect, type ServerLoad } from "@sveltejs/kit";
import { betterAuth } from "better-auth";
import { admin } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { ac, roles, type Role } from "./auth/roles.ts";
import prisma from "./prisma.ts";
import { arrayElementOverwraps } from "./utils.ts";
import type { Simplify } from "type-fest";

if (
  !env.GOOGLE_CLIENT_ID
  || !env.GOOGLE_CLIENT_SECRET
  || !env.FACEBOOK_CLIENT_ID
  || !env.FACEBOOK_CLIENT_SECRET
  || !env.GITHUB_CLIENT_ID
  || !env.GITHUB_CLIENT_SECRET
) {
  throw new Error(`Required environment variable(s) are not set.
    Did you set all of the {GOOGLE | FACEBOOK | GITHUB }_CLIENT_ID and {GOOGLE | FACEBOOK | GITHUB }_CLIENT_SECRET?`);
}

//
// auth setup
//
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  plugins: [
    admin({
      ac,
      roles: {
        ...roles,

        // Disable default roles
        admin: undefined,
        user: undefined,
      },
    }),
  ],
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
    facebook: {
      clientId: env.FACEBOOK_CLIENT_ID,
      clientSecret: env.FACEBOOK_CLIENT_SECRET,
    },
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
  },
  emailAndPassword: {
    enabled: false,
  },
});

export const getSession = async (...args: Parameters<typeof auth.api.getSession>) => {
  const session = await auth.api.getSession(...args);

  if (session && "user" in session) {
    return {
      ...session,
      user: {
        ...(session.user ?? {}),
        roles: session.user?.role?.split(",") as Role[],
      },
    };
  } else {
    return session;
  }
};

export type User = Simplify<
  typeof auth.$Infer.Session["user"] & {
    roles?: Role[];
  }
>;
export type Session = typeof auth.$Infer.Session["session"];

//
// requireAuthAs()
//

type RequireLoginAsOptions = Pick<Parameters<ServerLoad>[0], "request">;

export const requireAuthAs = async (
  expectedRoles: Role[] | "any",
  { request }: RequireLoginAsOptions
): Promise<{ user: User; session: Session; }> => {
  const { user, session } = await getSession({
    headers: request.headers,
  }) ?? {};

  if (!user || !session) {
    return redirect(303, "/auth");
  }

  if (!user.roles || user.roles.length <= 0) {
    return redirect(302, "/auth/signup");
  }

  if (expectedRoles === "any" || !arrayElementOverwraps(expectedRoles, user.roles)) {
    return { user, session };
  } else {
    return error(401, `This page is for the ${ expectedRoles.join(" or ") }.`);
  }
};
