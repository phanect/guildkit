import { z } from "zod";
import { currency } from "@/lib/db/schema/currencies.ts";

export const orgNameSchema = z.string().min(2, "Organization name must be at least 2 characters.");
export const orgSlugSchema = z.string()
  .min(2, "Slug must be at least 2 characters.")
  .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens.");
export const orgLogoSchema = z.url();
export const orgAboutSchema = z.string().optional();
export const orgUrlSchema = z.url("Please enter a valid URL.");
export const orgEmailSchema = z.email({ error: "Please enter a valid email here. Some legacy emails by Japanese mobile careers may not acceptable." });
export const orgAddressSchema = z.string();
export const orgCurrencySchema = z.enum(currency.enumValues);

export const orgSchema = z.object({
  name: orgNameSchema,
  slug: orgSlugSchema,
  logo: orgUrlSchema,
  about: orgAboutSchema,
  url: orgUrlSchema,
  emails: z.array(orgEmailSchema).optional(),
  addresses: z.array(orgAddressSchema).min(1, "At least one address is required."),
  currencies: z.array(z.enum(currency.enumValues)).min(1, "At least one currency is required."),
});
