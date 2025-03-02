import { error } from "@sveltejs/kit";
import prisma from "$lib/prisma.ts";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params: { id }}) => {
  const job = await prisma.job.findUnique({
    where: {
      id,
    },
  });

  if (!job) {
    return error(404);
  }

  return { job };
};
