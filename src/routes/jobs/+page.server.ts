import prisma from "$lib/prisma.ts";
import type { PageServerLoad } from "./$types";

export const load = (async () => {
  const today = new Date();
  const response = await prisma.job.findMany({
    where: {
      deadline: {
        gte: today,
      },
    },
  });
  return { jobs: response };
}) satisfies PageServerLoad;
