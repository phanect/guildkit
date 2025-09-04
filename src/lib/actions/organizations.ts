// TODO To Be Deleted
"use server";

import { redirect } from "next/navigation";
import { db } from "@/lib/db/db.ts";
import { organization } from "@/lib/db/schema/better-auth.ts";
import { orgProps } from "@/lib/db/schema/organization.ts";
import { organizationsAndRecruitersRelationTable } from "@/lib/db/schema/relations.ts";
import { organizationSchema } from "@/lib/validation/organization.validation.ts";
import { requireAuthAs } from "@/lib/auth/server.ts";

type CreateOrganizationState = {
  errors?: Partial<Record<keyof typeof organizationSchema._output, string[] | undefined>>;
  message?: string;
};

export const createOrganization = async (_initialState: CreateOrganizationState, formData: FormData): Promise<CreateOrganizationState> => {
  try {
    const { user: recruiter } = await requireAuthAs("recruiter", { allowOrphanRecruiter: true });

    const { success, error, data: validatedData } = organizationSchema.safeParse({
      name: formData.get("name") as string,
      slug: formData.get("slug") as string,
      logo: formData.get("logo") as string,
      about: formData.get("about") as string,
      url: formData.get("url") as string,
      emails: formData.get("emails") as string,
      addresses: formData.get("addresses") as string,
      currencies: formData.get("currencies") as string,
    });

    if (!success) {
      return {
        errors: error.flatten().fieldErrors,
      };
    }

    const emails = validatedData.emails?.map((email) => email.trim()).filter(Boolean);
    const addresses = validatedData.addresses.split(";").map((address) => address.trim()).filter(Boolean);
    const currencies = validatedData.currencies.split(";").map((currency) => currency.trim()).filter(Boolean);

    // Create organization properties first
    const [ createdOrgProps ] = await db.insert(orgProps).values({
      about: validatedData.about,
      url: validatedData.url,
      emails,
      addresses,
      currencies,
    }).returning({ id: orgProps.id });

    const [ createdOrg ] = await db.insert(organization).values({
      name: validatedData.name,
      slug: validatedData.slug,
      logo: validatedData.logo,
      propsId: createdOrgProps.id,
    }).returning({ id: organization.id, slug: organization.slug });

    // Associate recruiter with organization
    await db.insert(organizationsAndRecruitersRelationTable).values({
      organizationId: createdOrg.id,
      recruiterId: recruiter.id,
    });

    redirect("/employer/jobs");
  } catch (err) {
    console.error("Error creating organization:", err);
    return {
      message: "Failed to create organization. Sorry, this is probably a bug of our website. Error code: GK-BQ7CX",
    };
  }
};
