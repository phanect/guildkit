import { createAuthClient } from "better-auth/svelte";

export const { signIn, signOut } = createAuthClient();

export const signInWith = async (provider: "google" | "facebook" | "github") => signIn.social({
  provider,
  callbackURL: "/",
});
