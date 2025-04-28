import { z } from "zod";
import { zod as adaptSuperForms } from "sveltekit-superforms/adapters";

export const signupSchema = adaptSuperForms(z.object({
  fullname: z.string().min(4),
  email: z.string().email(),
  password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
}));

export const loginSchema = adaptSuperForms(z.object({
  email: z.string().email(),
  password: z.string(),
}));
