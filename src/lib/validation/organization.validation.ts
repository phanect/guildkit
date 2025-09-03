import { z } from "zod";
import { currency } from "@/lib/db/schema/currencies.ts";

export const organizationSchema = z.object({
  name: z.string().min(2, "Organization name must be at least 2 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters").regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
  logo: z.url(),

  about: z.string().optional(),
  url: z.url("Please enter a valid URL"),
  emails: z.array(z.string()).optional(),
  addresses: z.array(z.string()).min(1, "At least one address is required"),
  currencies: z.array(z.enum(currency.enumValues)).min(1, "At least one currency is required"),
});
