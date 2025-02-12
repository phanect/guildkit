import prisma from "$lib/prisma.ts";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params: { id }}) => {
  const job = await prisma.job.findUnique({
    where: {
      id,
    },
  });
  return { job };
}) satisfies PageServerLoad;
