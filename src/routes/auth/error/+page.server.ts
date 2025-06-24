import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url }) => {
  const errorId = url.searchParams.get("error");

  if (errorId === "signup_disabled") {
    return redirect(307, "/auth/signup");
  }

  return {
    message: errorId === "unable_to_create_user" ? "Unable to create user. We're sorry, this is probably our bug."
    : "Unexpected error. We're sorry, this is probably our bug.",
  };
};
