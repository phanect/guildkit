import { createAuthClient } from "better-auth/svelte";
import { adminClient, organizationClient, inferAdditionalFields } from "better-auth/client/plugins";
import { invalidateAll } from "$app/navigation";
import { adminAc, adminRoles, recruiterAc, recruiterRoles } from "$lib/auth/roles.ts";
import { requireAuthAs } from "$lib/auth/server.ts";
import { updateUserProps } from "$lib/db/helpers.ts";
import type { auth } from "$lib/auth.ts";
import type { User } from "./types.ts";

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
  userType: User["props"]["type"],
) => signIn.social({
  provider,
  callbackURL: userType === "recruiter" ? "/employer/jobs" : "/",
  errorCallbackURL: "/auth/error",
  requestSignUp: true,
  fetchOptions: {
    onSuccess: async () => {
      if (userType !== "candidate" && userType !== "recruiter") {
        throw new Error(`Unexpected userType "${ userType }" is given. Sorry, this is probably a bug of this website.`);
      }

      const { user } = await requireAuthAs("any");

      if (user && !user.props.type) {
        await updateUserProps(user).set({
          type: userType,
        });
      }
    },
  },
});

export const signOut = async () => baseSignOut({
  fetchOptions: {
    onSuccess: async () => invalidateAll(),
  },
});
