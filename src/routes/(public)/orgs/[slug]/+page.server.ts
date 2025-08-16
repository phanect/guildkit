import { error } from "@sveltejs/kit";
import { db } from "$lib/db/db.ts";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params: { slug }}) => {
  const org = await db.query.organization.findFirst({
    columns: {
      id: true,
      name: true,
    },
    where: (organization, { eq }) => eq(organization.slug, slug),
  });

  if (!org) {
    return error(404);
  }

  return { org };
};
