"use client";

import { createAuthClient } from "better-auth/react";
import { adminClient, organizationClient, inferAdditionalFields, inferOrgAdditionalFields } from "better-auth/client/plugins";
import { useRouter } from "next/navigation";
import { adminAc, adminRoles, recruiterAc, recruiterRoles } from "@/lib/auth/roles.ts";
import type { auth } from "@/lib/auth.ts";
import type { User } from "@/lib/auth/types.ts";

const { signIn, signOut, organization, useActiveOrganization } = createAuthClient({
  plugins: [
    adminClient({
      ac: adminAc,
      roles: adminRoles,
    }),
    organizationClient({
      ac: recruiterAc,
      roles: recruiterRoles,
      schema: inferOrgAdditionalFields<typeof auth>(),
    }),
    inferAdditionalFields<typeof auth>(),
  ],
});

export const signInWith = async (provider: "google" | "github") => signIn.social({
  provider,
  errorCallbackURL: "/auth/error",
  requestSignUp: false,
});

export const signUpWith = async (
  provider: "google" | "github",
  userType: User["props"]["type"],
) => signIn.social({
  provider,
  callbackURL: userType === "recruiter" ? "/employer/jobs" : "/",
  newUserCallbackURL: `/auth/signup/finalize/${ userType }`,
  errorCallbackURL: "/auth/error",
  requestSignUp: true,
});

export const useSignOut = () => {
  const router = useRouter();

  return {
    signOut: async () => signOut({
      fetchOptions: {
        onSuccess: () => router.refresh(),
      },
    }),
  };
};

export const getActiveOrg = async () => {
  const { data: activeOrg } = await organization.getFullOrganization();

  if (activeOrg) {
    return activeOrg;
  } else {
    const firstOrg = (await organization.list()).data?.[0];

    if (!firstOrg) {
      throw new Error("You do not belong to any organizations.");
    }

    await organization.setActive({
      organizationId: firstOrg.id,
    });

    return firstOrg;
  }
};

export {
  organization,
  useActiveOrganization,
};
