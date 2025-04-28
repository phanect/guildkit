import { superValidate } from "sveltekit-superforms/server";
import { error, fail, redirect, type Actions, type RequestEvent } from "@sveltejs/kit";
import { signupSchema } from "$lib/validation/user.validation.ts";
import { isRegistered } from "$lib/utils/user.utils.ts";
import prisma from "$lib/prisma.ts";
import { hashPassword } from "$lib/utils/bcrypt.utils.ts";

export const load = async (event: RequestEvent) => {
  const form = await superValidate(event, signupSchema);
  return { form };
};

export const actions: Actions = {
  default: async (event: RequestEvent) => {
    const form = await superValidate(event, signupSchema);
    if (!form.valid) {
      return fail(400, { form });
    }
    if (await isRegistered(form.data.email)) {
      return error(409, "User is already registered");
    }
    const password = await hashPassword(form.data.password);
    await prisma.user.create({
      data: { ...form.data, role: "RECRUITER", password },
    });
    return redirect(303, "/auth/login");
  },
};
