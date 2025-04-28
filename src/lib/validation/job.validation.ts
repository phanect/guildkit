import { z } from "zod";
import { zod as adaptSuperForms } from "sveltekit-superforms/adapters";
import { Currency, SalaryPer } from "@prisma/client";

export const jobSchema = adaptSuperForms(z.object({
  title: z.string().min(4),
  description: z.string().min(4),
  requirements: z.string().min(4),
  applicationUrl: z.string().url(),
  location: z.string().min(2),
  salary: z.number().positive(),
  currency: z.nativeEnum(Currency),
  salaryPer: z.nativeEnum(SalaryPer),
  company: z.string().min(5),
  deadline: z.string().transform((str) => new Date(str)),
}));
