import { z } from "zod";
import { zod as adaptSuperForms } from "sveltekit-superforms/adapters";

export const jobSchema = adaptSuperForms(z.object({
  title: z.string().min(4),
  description: z.string().min(4),
  requirements: z.string().min(4),
  applicationUrl: z.string().url(),
  location: z.string().min(2),
  salary: z.string().min(2),
  company: z.string().min(5),
  deadline: z.string().transform((str) => new Date(str)),
}));
