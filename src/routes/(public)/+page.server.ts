import { prisma } from "$lib/prisma.ts";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  const today = new Date();
  const response = await prisma.job.findMany({
    where: {
      expiresAt: {
        gte: today,
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
    include: {
      employer: {
        select: {
          name: true,
        },
      },
    },
  });
  return { jobs: response };
};
