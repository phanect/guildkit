import { createAuthClient } from "better-auth/svelte";
import { magicLinkClient } from "better-auth/client/plugins";
import { invalidateAll } from "$app/navigation";
import type { UserRole } from "@prisma/client";

export const { signIn, signOut: baseSignOut } = createAuthClient({
  plugins: [
    magicLinkClient(),
  ],
});

export const signInWith = async (
  provider: "google" | "facebook" | "github",
  userRole: UserRole,
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
