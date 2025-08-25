import { z } from "zod";
import { zod as adaptSuperForms } from "sveltekit-superforms/adapters";
import { salaryPer } from "$lib/db/schema/job.ts";
import { currency } from "$lib/db/schema/currencies.ts";

export const jobSchema = adaptSuperForms(z.object({
  title: z.string().min(2),
  description: z.string().min(4),
  requirements: z.string().min(4),
  applicationUrl: z.string().url(),
  location: z.string().min(2),
  salary: z.number().positive(),
  currency: z.enum(currency.enumValues),
  salaryPer: z.enum(salaryPer.enumValues),
  recruiterId: z.string(),
  expiresAt: z.string().date(),
}));
