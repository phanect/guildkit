import { fail, redirect } from "@sveltejs/kit";
import jwt from "jsonwebtoken";
import { superValidate } from "sveltekit-superforms/server";
import prisma from "$lib/prisma.ts";
import { jobSchema } from "$lib/validation/job.validation.ts";
import type { PageServerLoad, RequestEvent } from "./$types";
import { JWT_SECRET } from "$env/static/private";

export const load: PageServerLoad = async ({ cookies }) => {
  const token = cookies.get("token");
  if (typeof token !== "string") {
    return fail(400, { reason: "Invalid token" });
  }
  const decodedToken = jwt.verify(token, JWT_SECRET) as { role: UserRole; id: string; };
  const { id, role } = decodedToken;

  if (role === "RECRUITER") {
    return {
      jobs: await prisma.job.findMany({
        where: {
          employerId: id,
        },
      }),
      role,
    };
  } else if (role === "CANDIDATE" || role === "ADMIN") {
    return fail(400, { reason: "Unauthorized" });
  } else {
    console.error(`Unexpected \`role\` value: "${ role as string }"`);
    return fail(400, { reason: "Unauthorized" });
  }
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
