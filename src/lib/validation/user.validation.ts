import { z } from "zod";
import { zod as adaptSuperForms } from "sveltekit-superforms/adapters";

export const loginSchema = adaptSuperForms(z.object({
  email: z.string().email(),
  password: z.string(),
}));
