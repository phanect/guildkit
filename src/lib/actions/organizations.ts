"use server";

import { randomUUID } from "node:crypto";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { flattenError } from "zod";
import { orgSchema, type Organization } from "@/lib/validation/organization.ts";
import { auth } from "@/lib/auth.ts";
import { endPointURL, logoDirName, putObject } from "@/lib/storage.ts";
import type { ActionState } from "@/lib/types.ts";

const uploadLogo = async (logoFile: File) => {
  const fileExt = logoFile.name.split(".").pop() ?? "";
  const destPath = `${ logoDirName }/${ randomUUID() }.${ fileExt }`;

  await putObject(destPath, logoFile);

  return `${ endPointURL }/${ destPath }`;
};

export const createOrganization = async (_initialState: ActionState<Organization>, formData: FormData): Promise<ActionState<Organization>> => {
  try {
    const {
      success,
      error,
      data,
    } = orgSchema.safeParse({
      name: formData.get("name"),
      slug: formData.get("slug"),
      logo: formData.get("logo"),
      about: formData.get("about"),
      url: formData.get("url"),
      emails: formData.get("emails"),
      addresses: formData.get("addresses"),
      currencies: formData.get("currencies"),
    });

    if (!success) {
      return {
        errors: flattenError(error),
      };
    }

    const { logo, ...newOrgData } = data;

    const logoURL = logo ? await uploadLogo(logo) : undefined;

    await auth.api.createOrganization({
      body: {
        ...newOrgData,
        logo: logoURL,
      },
      headers: await headers(),
    });

    redirect("/employer/jobs");
  } catch (err) {
    console.error("Unexpected error on creating organization:", err);

    return {
      errors: {
        formErrors: [ "Failed to create organization. Sorry, this is probably a bug of our website. Error code: GK-BQ7CX" ],
        fieldErrors: {},
      },
    };
  }
};
