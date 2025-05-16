import { error, redirect } from "@sveltejs/kit";
import { auth } from "$lib/auth.ts";
import prisma from "$lib/prisma.ts";
import type { Actions, PageServerLoad } from "./$types";
import type { UserRole } from "@prisma/client";

export const load: PageServerLoad = async ({ request }) => {
  const { user, session } = await auth.api.getSession({
    headers: request.headers,
  }) ?? {};

  if (!user || !session) {
    console.log("user does not exist");
    return redirect(302, "/auth");
  }

  if (user.role) {
    return redirect(302, user.role === "RECRUITER" ? "/employer" : "/");
  }
};

export const actions: Actions = {
  setRole: async ({ request }) => {
    const role = (await request.formData()).get("role");

    if (typeof role !== "string") {
      return error(400, "`role` must be given as a string format");
    }

    if (role !== "candidate" && role !== "recruiter") {
      return error(400, "`role` must be `candidate` or `recruiter`");
    }

    const { user } = await auth.api.getSession({
      headers: request.headers,
    }) ?? {};

    if (!user) {
      return error(401, "Not authenticated yet.");
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        role: role.toUpperCase() as UserRole,
      },
    });
  },
};
