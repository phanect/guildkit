import { createAuthClient } from "better-auth/svelte";
import type { UserRole } from "@prisma/client";

export const { signIn, signOut } = createAuthClient();

export const signInWith = async (
  provider: "google" | "facebook" | "github",
  userRole: UserRole,
) => signIn.social({
  provider,
  callbackURL: "/",
  newUserCallbackURL: `/auth/signup?role=${ userRole }`,
  errorCallbackURL: "/auth/error",
});
