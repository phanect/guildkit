import { env } from "node:process";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { admin as adminPlugin, organization } from "better-auth/plugins";
import { z } from "zod";
import { currencies } from "@/intermediate/currencies.ts";
import { adminAc, adminRoles, recruiterAc, recruiterRoles } from "@/lib/auth/roles.ts";
import { prisma } from "@/lib/prisma.ts";

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
const baseURL = env.BETTER_AUTH_URL ?? (
  env.VERCEL_URL ? `https://${ env.VERCEL_URL }` // TODO Make it independent to Vercel
  : undefined
);

if (!baseURL) {
  throw new Error("baseURL is not set. Is BETTER_AUTH_URL set?");
}

const oAuthConfigs = {
  disableImplicitSignUp: true,
};

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  baseURL,
  user: {
    additionalFields: {
      propsId: {
        type: "string",
        required: true,
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          if (user.propsId) {
            return {
              data: user,
            };
          } else {
            const { id: propsId } = await prisma.userProps.create({
              data: {
                userId: user.id,
              },
            });

            return {
              data: {
                ...user,
                propsId,
              },
            };
          }
        },
      },
    },
    session: {
      create: {
        // Set first organization as active organization on login
        before: async (session) => {
          if (session.activeOrganizationId) {
            return {
              data: session,
            };
          } else {
            const { organizationId } = await prisma.member.findFirst({
              select: {
                organizationId: true,
              },
              where: {
                userId: session.userId,
              },
            }) ?? {};

            if (!organizationId) {
              return {
                data: session,
              };
            }

            return {
              data: {
                ...session,
                activeOrganizationId: organizationId,
              },
            };
          }
        },
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
      schema: {
        organization: {
          additionalFields: {
            url: {
              type: "string",
              required: true,
              unique: true,
            },
            addresses: {
              type: "string[]",
              required: true,
            },
            currencies: {
              type: "string[]",
              required: true,
              validator: {
                input: z.array(z.enum(currencies)),
              },
            },
            emails: {
              type: "string[]",
              required: false,
            },
            about: {
              type: "string",
              required: false,
            },
          },
        },
      },
      allowUserToCreateOrganization: async (baUser) => {
        const user = await prisma.user.findFirst({
          select: {
            props: {
              select: {
                type: true,
              },
            },
          },
          where: {
            id: baUser.id,
          },
        });

        return user?.props.type === "recruiter";
      },
    }),
    adminPlugin({
      defaultRole: "none",
      adminRoles: [ "gkAdmin" ],
      defaultBanReason: "Unspecified",
      ac: adminAc,
      roles: adminRoles,
    }),
    nextCookies(), // this plugin has to be the last plugin in the array
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
