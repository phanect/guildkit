import { createAuthClient } from "better-auth/svelte";
import { adminClient, inferAdditionalFields } from "better-auth/client/plugins";
import { invalidateAll } from "$app/navigation";
import { ac, roles, type SignUpRole } from "$lib/auth/roles.ts";
import type { auth } from "$lib/auth.ts";

export const { signIn, signOut: baseSignOut, admin } = createAuthClient({
  plugins: [
    adminClient({
      ac,
      roles,
    }),
    inferAdditionalFields<typeof auth>(),
  ],
});

export const signInWith = async (
  provider: "google" | "facebook" | "github",
  userRole: SignUpRole,
) => signIn.social({
  provider,
  callbackURL: "/",
  newUserCallbackURL: `/auth/signup?role=${ userRole }`,
  errorCallbackURL: "/auth/error",
});

export const signOut = async () => baseSignOut({
  fetchOptions: {
    onSuccess: async () => invalidateAll(),
  },
});
