import { error, fail, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import prisma from "$lib/prisma.ts";
import { requireAuthAs } from "$lib/auth.ts";
import { jobSchema } from "$lib/validation/job.validation.ts";
import type { PageServerLoad, RequestEvent } from "./$types";

export const load: PageServerLoad = async ({ parent }) => {
  const { user } = await parent();

  if (!user || (!user.roles.includes("recruiter") && !user.roles.includes("recruiterOrgOwner"))) {
    console.error(
      "[ERROR] User role must be `recruiter` or `recruiterOrgOwner`, but "
      + (user ? `the user.roles are \`[ ${ user.roles.join(", ") } ]\`` : "user does not exist.")
    );
    // This should not happen because the +layout.server.ts should check if the user logged-in.
    return error(500, "Something is technically wrong. Sorry, this is probably a bug of GuildKit. Error code: GK-937T2");
  }

  return {
    jobs: await prisma.job.findMany({
      where: {
        employerId: user.id,
      },
    }),
    roles: user.roles,
  };
};

const requireAuthAsRecruiter = (options: Parameters<typeof requireAuthAs>[1]) =>
  requireAuthAs([ "recruiter", "recruiterOrgOwner" ], options);

export const actions = {
  create: async ({ request }: RequestEvent) => {
    const { user } = await requireAuthAsRecruiter({ request });
    const employerId = user?.id;

    if (!employerId) {
      return fail(401, {
        error: "Not authenticated as a recruiter.",
      });
    }

    const form = await superValidate(event, jobSchema);

    if (!form.valid) {
      return fail(400, { form });
    }

    await prisma.job.create({
      data: { ...form.data, employerId },
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
