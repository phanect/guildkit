import { env } from "node:process";
import { error, redirect } from "@sveltejs/kit";
import { betterAuth } from "better-auth";
import { admin as adminPlugin, organization } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { adminAc, adminRoles, recruiterAc, recruiterRoles } from "./auth/roles.ts";
import { db } from "./db/db.ts";

if (
  !env.GOOGLE_CLIENT_ID
  || !env.GOOGLE_CLIENT_SECRET
  || !env.GITHUB_CLIENT_ID
  || !env.GITHUB_CLIENT_SECRET
) {
  throw new Error(`Required environment variable(s) are not set.
    Did you set all of the { GOOGLE | GITHUB }_CLIENT_ID and {GOOGLE | GITHUB }_CLIENT_SECRET?`);
}

//
// auth setup
//
const oAuthConfigs = {
  disableImplicitSignUp: true,
};

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  user: {
    additionalFields: {
      type: {
        type: [ "candidate", "recruiter", "administrative" ],
        required: false,
        input: true,
      },
    },
  },
  plugins: [
    organization({
      defaultRole: "recruiter",
      adminRoles: [ "recruiterAdmin" ],
      creatorRole: "recruiterAdmin",
      ac: recruiterAc,
      roles: recruiterRoles,
    }),
    adminPlugin({
      defaultRole: "none",
      adminRoles: [ "gkAdmin" ],
      defaultBanReason: "Unspecified",
      ac: adminAc,
      roles: adminRoles,
    }),
  ],
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      ...oAuthConfigs,
    },
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      ...oAuthConfigs,
    },
  },
  emailAndPassword: {
    enabled: false,
  },
});

export type User = typeof auth.$Infer.Session["user"];
export type Session = typeof auth.$Infer.Session["session"];

export const requireAuthAs = async (
  expectedType: User["type"] | "any",
  { request }: { request: Request; },
): Promise<{ user: User; session: Session; }> => {
  const reqURL = new URL(request.url);

  const { user, session } = await auth.api.getSession({
    headers: request.headers,
  }) ?? {};

  if (!user || !session) {
    return redirect(303, "/auth");
  }

  if (!user.type) {
    if (reqURL.pathname.startsWith("/auth/signup/")) {
      return { user, session };
    } else {
      return redirect(302, "/auth/signup/candidate");
    }
  }

  if (expectedType === "any" || expectedType === user.type) {
    return { user, session };
  } else {
    return error(401, `This page is for the ${ expectedType }s.`);
  }
};
