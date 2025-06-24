import { createAuthClient } from "better-auth/svelte";
import { adminClient, organizationClient, inferAdditionalFields } from "better-auth/client/plugins";
import { invalidateAll } from "$app/navigation";
import { adminAc, adminRoles, recruiterAc, recruiterRoles } from "$lib/auth/roles.ts";
import type { auth, User } from "$lib/auth.ts";

export const { signIn, signOut: baseSignOut, organization, admin } = createAuthClient({
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
  callbackURL: "/",
  errorCallbackURL: "/auth/error",
  requestSignUp: false,
});

export const signUpWith = async (
  provider: "google" | "github",
  userType: User["type"],
) => signIn.social({
  provider,
  callbackURL: "/",
  newUserCallbackURL: `/auth/signup/postprocess/${ userType }`,
  errorCallbackURL: "/auth/error",
  requestSignUp: true,
});

export const signOut = async () => baseSignOut({
  fetchOptions: {
    onSuccess: async () => invalidateAll(),
  },
});
