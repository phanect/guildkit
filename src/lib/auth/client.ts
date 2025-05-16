import { createAuthClient } from "better-auth/svelte";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { invalidateAll } from "$app/navigation";
import type { auth } from "$lib/auth.ts";

export const { signIn, signOut: baseSignOut } = createAuthClient({
  plugins: [
    inferAdditionalFields<typeof auth>(),
  ],
});

export const signInWith = async (provider: "google" | "github") => signIn.social({
  provider,
  callbackURL: "/",
  errorCallbackURL: "/auth/error",
});

export const signOut = async () => baseSignOut({
  fetchOptions: {
    onSuccess: async () => invalidateAll(),
  },
});
