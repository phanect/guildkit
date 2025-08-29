"use client";

import { createAuthClient } from "better-auth/svelte";
import { adminClient, organizationClient, inferAdditionalFields } from "better-auth/client/plugins";
import { useRouter } from "next/navigation";
import { adminAc, adminRoles, recruiterAc, recruiterRoles } from "@/lib/auth/roles.ts";
import type { auth } from "@/lib/auth.ts";
import type { User } from "@/lib/auth/types.ts";

const { signIn, signOut } = createAuthClient({
  plugins: [
    adminClient({
      ac: adminAc,
      roles: adminRoles,
    }),
    organizationClient({
      ac: recruiterAc,
      roles: recruiterRoles,
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
