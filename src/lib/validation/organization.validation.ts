import { z } from "zod";
import { zod as adaptSuperForms } from "sveltekit-superforms/adapters";

export const organizationSchema = adaptSuperForms(z.object({
  name: z.string().min(2, "Organization name must be at least 2 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters").regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
  logo: z.string().url().optional().or(z.literal("")),

  about: z.string().optional().or(z.literal("")),
  url: z.string().url("Please enter a valid URL"),
  emails: z.string().min(1, "At least one email is required"),
  addresses: z.string().min(1, "At least one address is required"),
  currencies: z.string().min(1, "At least one currency is required"),
}));
