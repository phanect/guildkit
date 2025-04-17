import prisma from "$lib/prisma.ts";
import type { Job } from "$lib/prisma/index.d.ts";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad<{ jobs: Job[]; }> = async () => {
  const today = new Date();
  const response = await prisma.job.findMany({
    where: {
      deadline: {
        gte: today,
      },
    },
  });
  return { jobs: response };
};
