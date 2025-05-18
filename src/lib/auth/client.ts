import { createAuthClient } from "better-auth/svelte";
import { adminClient, inferAdditionalFields } from "better-auth/client/plugins";
import { invalidateAll } from "$app/navigation";
import { ac, roles } from "$lib/auth/roles.ts";
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

export const signInWith = async (provider: "google" | "facebook" | "github") => signIn.social({
  provider,
  callbackURL: "/",
});

export const signOut = async () => baseSignOut({
  fetchOptions: {
    onSuccess: async () => invalidateAll(),
  },
});
