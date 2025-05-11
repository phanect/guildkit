import { env } from "node:process";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma.ts";

if (
  !env.GOOGLE_CLIENT_ID
  || !env.GOOGLE_CLIENT_SECRET
  || !env.GITHUB_CLIENT_ID
  || !env.GITHUB_CLIENT_SECRET
) {
  throw new Error(`Required environment variable(s) are not set.
    Did you set all of the { GOOGLE | GITHUB }_CLIENT_ID and {GOOGLE | GITHUB }_CLIENT_SECRET?`);
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
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
  },
  emailAndPassword: {
    enabled: false,
  },
});
