import { error, fail, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import jwt from "jsonwebtoken";
import { loginSchema } from "$lib/validation/user.validation.ts";
import { isRegistered } from "$lib/utils/user.utils.ts";
import { isValidPassword } from "$lib/utils/bcrypt.utils.ts";
import prisma from "$lib/prisma.ts";
import type { RequestEvent } from "./$types";
import { JWT_SECRET } from "$env/static/private";

export const load = async (event: RequestEvent) => {
  const form = await superValidate(event, loginSchema);
  return { form };
};

export const actions = {
  default: async (event: RequestEvent) => {
    const form = await superValidate(event, loginSchema);

    if (!form.valid) {
      return fail(400, { form });
    }

    if (!(await isRegistered(form.data.email))) {
      return error(400, "User not found");
    }

    const user = await prisma.user.findUnique({
      where: {
        email: form.data.email,
      },
    });

    if (!user || !(await isValidPassword(form.data.password, user.password))) {
      return error(400, "Invalid email or password");
    }

    const userData = {
      id: user.id,
      role: user.role,
      email: user.email,
      full_name: user.full_name,
    };

    const token = jwt.sign(userData, JWT_SECRET, { expiresIn: "1d" });
    event.cookies.set("token", token, {
      httpOnly: true,
      path: "/",
      sameSite: true,
      maxAge: 60 * 60 * 24,
    });

    if (user.role === "CANDIDATE") {
      return redirect(303, "/");
    }
    if (user.role === "ADMIN") {
      return redirect(303, "/users");
    }
    if (user.role === "EMPLOYER") {
      return redirect(303, "/employer/jobs");
    }
  },
};
