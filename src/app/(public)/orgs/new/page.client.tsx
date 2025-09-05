"use client";

import { useRef, useState, type ReactElement } from "react";
import { ArrayField } from "@/components/generic/ArrayField.tsx";
import { Field } from "@/components/generic/Field.tsx";
import { Button } from "@/components/generic/ButtonLink.tsx";
import { organization } from "@/lib/auth/client.ts";
import {
  orgAboutSchema,
  orgAddressSchema,
  orgCurrencySchema,
  orgEmailSchema,
  orgLogoSchema,
  orgNameSchema,
  orgSlugSchema,
  orgUrlSchema,
} from "@/lib/validation/organization.validation.ts";

export default function NewOrgPageClient(): ReactElement {
  const nameRef = useRef<HTMLInputElement>(null);
  const slugRef = useRef<HTMLInputElement>(null);
  const logoRef = useRef<HTMLInputElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);
  const aboutRef = useRef<HTMLTextAreaElement>(null);

  const [ errorMessage, setErrorMessage ] = useState<string>("");

  const createOrganization = async () => {
    setErrorMessage("");

    if (
      !nameRef.current?.value
      || !slugRef.current?.value
      || !logoRef.current?.value
      || !urlRef.current?.value
      || !aboutRef.current?.value
    ) {
      // TODO error
      throw new Error();
    }

    const { error } = await organization.create({
      name: nameRef.current.value,
      slug: slugRef.current.value,
      logo: logoRef.current.value,
      url: urlRef.current?.value,
      about: aboutRef.current?.value,
      currencies: [ "JPY" ], // TODO
      addresses: [], // TODO
    });

    if (error) {
      setErrorMessage(
        error.message
        ?? `Something is technicaly wrong. Sorry, this is probably our bug. HTTP ${ error.status }: ${ error.statusText };`
          + (error.code ? `error code ${ error.code }` : "")
      );
    }
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold flex justify-center mb-5">
        Create a new organization
      </h1>

      {errorMessage && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-800">{errorMessage}</p>
        </div>
      )}

      <Field
        type="text"
        label="Organization Name"
        placeholder="Your Company Name"
        name="name"
        autoComplete="organization"
        validator={orgNameSchema}
        required
        className="mb-6"
        ref={nameRef}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Field
          type="text"
          label="Organization Slug"
          description="Used in URLs. Lowercase letters, numbers, and hyphens only"
          placeholder="your-company-name"
          name="slug"
          validator={orgSlugSchema}
          required
          className="mb-6"
          ref={slugRef}
        />

        <Field
          type="url"
          label="Logo URL"
          placeholder="https://yourcompany.com/logo.png"
          name="logo"
          autoComplete="photo"
          validator={orgLogoSchema}
          className="mb-6"
          ref={logoRef}
        />
      </div>

      <Field
        type="url"
        label="Website URL"
        placeholder="https://yourcompany.com"
        name="url"
        autoComplete="url"
        validator={orgUrlSchema}
        required
        className="mb-6"
        ref={urlRef}
      />

      <Field
        type="textarea"
        label="About"
        placeholder="Tell us about your organization..."
        name="about"
        validator={orgAboutSchema}
        className="mb-6"
        ref={aboutRef}
      />

      <ArrayField
        type="email"
        label="Contact Emails"
        itemName="email"
        description="In addition to the recruiters' emails, you can also send notifications to these emails"
        placeholder="account-team@example.com"
        name="email"
        validator={orgEmailSchema}
        className="mb-6"
      />

      <ArrayField
        type="text"
        label="Addresses"
        itemName="address"
        placeholder="123 Main St, City, Country; 456 Branch Ave, Another City, Country"
        name="addresses"
        autoComplete="street-address"
        validator={orgAddressSchema}
        required
        className="mb-6"
      />

      {/* TODO */}
      {/* <ArrayField
        type="select"
        label="Supported Currencies"
        itemName="supported currency"
        name="currencies"
        validator={orgCurrencySchema}
        required
        className="mb-6"
      /> */}

      <Button
        theme="button-deep"
        className="w-full"
        onClick={() => void createOrganization()}
      >
        Create Organization
      </Button>
    </section>
  );
}
