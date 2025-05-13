import { error, fail, redirect, type ActionFailure } from "@sveltejs/kit";
import jwt from "jsonwebtoken";
import { superValidate } from "sveltekit-superforms/server";
import prisma from "$lib/prisma.ts";
import { jobSchema } from "$lib/validation/job.validation.ts";
import type { Job, UserRole } from "@prisma/client";
import type { PageServerLoad, RequestEvent } from "./$types";
import { JWT_SECRET } from "$env/static/private";

type LoadReturn = {
  jobs: Job[];
  role: UserRole;
} | ActionFailure<{ reason: string; }>;

export const load: PageServerLoad<LoadReturn> = async ({ locals }) => {
  if (!locals.user || locals.user.role !== "RECRUITER") {
    // This should not happen because the +layout.server.ts should check if the user logged-in.
    return error(500, "Something is technically wrong. Sorry, this is probably a bug of GuildKit. Error code: GK-937T2");
  }

  return {
    jobs: await prisma.job.findMany({
      where: {
        employerId: locals.user.id,
      },
    }),
    role: locals.user.role,
  };
};

export const actions = {
  create: async (event: RequestEvent) => {
    const form = await superValidate(event, jobSchema);
    if (!form.valid) {
      return fail(400, { form });
    }
    const token = event.cookies.get("token");
    if (typeof token !== "string") {
      return fail(400, { error: "Invalid token" });
    }
    const decodedToken = jwt.verify(token, JWT_SECRET) as { id: string; };
    const { id } = decodedToken;
    await prisma.job.create({
      data: { ...form.data, employerId: id },
    });
    redirect(303, "/employer/jobs");
  },
  delete: async (event: RequestEvent) => {
    const data = await event.request.formData();
    const id = data.get("id");

    if (!id) {
      fail(400, { error: "`id` of the job to delete was not given." });
      return;
    }

    if (id instanceof File) {
      fail(400, { error: "`id` must not be a File." });
      return;
    }

    await prisma.job.delete({
      where: { id },
    });
  },
};
