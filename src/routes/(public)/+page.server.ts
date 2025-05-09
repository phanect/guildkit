import prisma from "$lib/prisma.ts";
import type { Job } from "@prisma/client";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad<{ jobs: Job[]; }> = async () => {
  const today = new Date();
  const response = await prisma.job.findMany({
    where: {
      expiresAt: {
        gte: today,
      },
    },
  });
  return { jobs: response };
};
