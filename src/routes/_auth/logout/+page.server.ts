import { redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
  default: async ({ cookies }) => {
    cookies.set("token", "", {
      httpOnly: true,
      path: "/",
      maxAge: 0,
    });
    redirect(303, "/auth/login");
  },
};
