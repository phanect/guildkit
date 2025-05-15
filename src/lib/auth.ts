import { env } from "node:process";
import { error, redirect, type ServerLoad } from "@sveltejs/kit";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { magicLink } from "better-auth/plugins";
import { Resend } from "resend";
import prisma from "./prisma.ts";
import type { UserRole } from "@prisma/client";

const magicLinkExpiresInMinutes = 5;

if (
  !env.GOOGLE_CLIENT_ID
  || !env.GOOGLE_CLIENT_SECRET
  || !env.FACEBOOK_CLIENT_ID
  || !env.FACEBOOK_CLIENT_SECRET
  || !env.GITHUB_CLIENT_ID
  || !env.GITHUB_CLIENT_SECRET
  || !env.RESEND_API_KEY
) {
  throw new Error(`Required environment variable(s) are not set.
    Did you set all of the {GOOGLE | FACEBOOK | GITHUB }_CLIENT_ID, {GOOGLE | FACEBOOK | GITHUB }_CLIENT_SECRET, and RESEND_API_KEY?`);
}

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  user: {
    additionalFields: {
      role: {
        type: [ "ADMIN", "RECRUITER", "CANDIDATE" ],
        required: true,
      },
    },
  },
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
  plugins: [
    magicLink({
      expiresIn: magicLinkExpiresInMinutes * 60,
      sendMagicLink: async ({ email, token, url }, request) => {
        const resend = new Resend(env.RESEND_API_KEY);

        await resend.emails.send({
          from: "system@guildkit.net",
          to: email,
          subject: "[GuildKit] one-time password to sign in",
          text: `Please click the following link to sign in to your GuildKit account:

${ url }

Or enter the following token:

${ token }

These link and token expire in ${ magicLinkExpiresInMinutes } minutes.
`,
        });
      },
    }),
  ],
  emailAndPassword: {
    enabled: false,
  },
});

export type User = typeof auth.$Infer.Session["user"];
export type Session = typeof auth.$Infer.Session["session"];

type RequireLoginAsOptions = Pick <Parameters<ServerLoad>[0], "locals" | "request">;

export const requireAuthAs = async (
  expectedRole: UserRole,
  { locals, request }: RequireLoginAsOptions
): Promise<{ user: User; session: Session; }> => {
  const { user, session } = await auth.api.getSession({
    headers: request.headers,
  }) ?? {};

  if (!user || !session) {
    return redirect(303, "/auth");
  }

  if (!user.role) {
    return redirect(302, "/auth/signup");
  }

  if (user.role !== expectedRole) {
    return error(401, `This page is for the ${ expectedRole === "CANDIDATE" ? "candidates" : "employers" }.`);
  }

  locals.user = user;
  locals.session = session;

  return { user, session };
};
