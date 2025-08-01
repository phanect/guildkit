import { z } from "zod";
import { zod as adaptSuperForms } from "sveltekit-superforms/adapters";
import { currency, salaryPer } from "$lib/db/schema.ts";

export const jobSchema = adaptSuperForms(z.object({
  title: z.string().min(4),
  description: z.string().min(4),
  requirements: z.string().min(4),
  applicationUrl: z.string().url(),
  location: z.string().min(2),
  salary: z.number().positive(),
  currency: z.enum(currency.enumValues),
  salaryPer: z.enum(salaryPer.enumValues),
  company: z.string().min(5),
  expiresAt: z.string().transform((str) => new Date(str)),
}));
