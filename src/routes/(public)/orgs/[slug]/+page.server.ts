import { error } from "@sveltejs/kit";
import { db } from "$lib/db/db.ts";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params: { slug }}) => {
  const orgWithJobs = await db.query.organization.findFirst({
    columns: {
      id: true,
      name: true,
    },
    with: {
      props: {
        columns: {
          url: true,
          about: true,
        },
      },
      jobs: {
        limit: 6,
        columns: {
          id: true,
          title: true,
          description: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
    where: (organization, { eq }) => eq(organization.slug, slug),
  });

  if (!orgWithJobs) {
    return error(404);
  }

  const { jobs, ...org } = orgWithJobs;

  return {
    org,
    jobs: jobs.map((job) => ({
      ...job,
      employer: {
        name: org.name,
      },
    })) };
};
