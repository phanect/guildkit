import prisma from "$lib/prisma.ts";

export const isRegistered = async (email: string) => {
  return prisma.user.findUnique({
    where: { email },
  });
};
