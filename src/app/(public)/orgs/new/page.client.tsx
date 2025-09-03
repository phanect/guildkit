"use client";

import Image from "next/image";
import { useActionState, useState, type ReactElement } from "react";
import { Field } from "@/components/generic/Field.tsx";
import { Button } from "@/components/generic/ButtonLink.tsx";
import { createOrganization } from "@/lib/actions/organizations.ts";

export default function NewOrgPageClient(): ReactElement {
  const [ state, formAction, isCreatingOrg ] = useActionState(createOrganization, {});
  const [ emails, setEmails ] = useState<string[]>([ "" ]);

  const addEmail = () => setEmails([ ...emails, "" ]);

  const removeEmail = (index: number) => {
    if (emails.length > 1) {
      setEmails(emails.filter((_, i) => i !== index));
    }
  };

  const updateEmail = (index: number, value: string) => {
    const newEmails = [ ...emails ];
    newEmails[index] = value;
    setEmails(newEmails);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold flex justify-center mb-5">
        Create a new organization
      </h1>

      {state.message && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-800">{state.message}</p>
        </div>
      )}

      <form action={formAction}>
        <Field
          type="text"
          label="Organization Name"
          placeholder="Your Company Name"
          errormsgs={state.errors?.name}
          name="name"
          autoComplete="organization"
          required
          className="mb-6"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Field
            type="text"
            label="Organization Slug"
            description="Used in URLs. Lowercase letters, numbers, and hyphens only"
            placeholder="your-company-name"
            errormsgs={state.errors?.slug}
            name="slug"
            required
            className="mb-6"
          />

          <Field
            type="url"
            label="Logo URL"
            placeholder="https://yourcompany.com/logo.png"
            errormsgs={state.errors?.logo}
            name="logo"
            autoComplete="photo"
            className="mb-6"
          />
        </div>

        <Field
          type="url"
          label="Website URL"
          placeholder="https://yourcompany.com"
          errormsgs={state.errors?.url}
          name="url"
          autoComplete="url"
          required
          className="mb-6"
        />

        <Field
          type="textarea"
          label="About"
          placeholder="Tell us about your organization..."
          errormsgs={state.errors?.about}
          name="about"
          className="mb-6"
        />

        <div className="mb-6">
          <label htmlFor="emails" className="block font-bold mb-2">
            Contact Emails
            <span className="text-red-400 ml-1">*</span>
          </label>
          <div className="space-y-2">
            {emails.map((email, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="email"
                  id="emails"
                  name="emails"
                  className={`flex-1 px-3 py-3 border rounded-md text-base transition-colors duration-150 ease-in-out focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-100 ${
                    state.errors?.emails
                      ? "border-red-600 focus:border-red-600 focus:ring-red-100"
                      : "border-gray-300 focus:border-blue-500"
                  }`}
                  value={email}
                  onChange={(e) => updateEmail(index, e.target.value)}
                  placeholder="contact@yourcompany.com"
                />
                {emails.length > 1 && (
                  <Button
                    theme="none"
                    className="flex items-center justify-center w-8 h-8 border border-gray-300 rounded-md bg-gray-50 hover:bg-red-50 hover:border-red-400 transition-colors"
                    onClick={() => removeEmail(index)}
                    title="Remove this email"
                  >
                    <Image
                      src="/vendor/octicons/x.svg"
                      alt="Remove this email"
                      width={24}
                      height={24}
                      decoding="async"
                    />
                  </Button>
                )}
              </div>
            ))}

            <Button
              theme="none"
              className="flex items-center justify-center gap-1.5 mt-4 pl-1.5 pr-2 pt-2 pb-2 font-semibold hover:bg-gray-300 hover:rounded-md transition-colors"
              onClick={addEmail}
              title="Add another email"
            >
              <Image
                src="/vendor/octicons/plus.svg"
                alt=""
                width={22}
                height={22}
                decoding="async"
              /> Add email
            </Button>
          </div>
          {state.errors?.emails && (
            <div className="mt-2">
              {state.errors.emails.map((error, index) => (
                <div key={index} className="text-red-600 text-sm">
                  {error}
                </div>
              ))}
            </div>
          )}
        </div>

        <Field
          type="textarea"
          label="Addresses"
          description="Separate multiple addresses with semicolons ;"
          placeholder="123 Main St, City, Country; 456 Branch Ave, Another City, Country"
          errormsgs={state.errors?.addresses}
          name="addresses"
          autoComplete="street-address"
          required
          className="mb-6"
        />

        <Field
          type="text"
          label="Supported Currencies"
          description="Separate multiple currencies with semicolons ; - e.g., USD; EUR; JPY"
          placeholder="USD; EUR; JPY"
          errormsgs={state.errors?.currencies}
          name="currencies"
          required
          className="mb-6"
        />

        <Button
          type="submit"
          theme="button-deep"
          className="w-full"
          disabled={isCreatingOrg}
        >
          {isCreatingOrg ? "Creating Organization..." : "Create Organization"}
        </Button>
      </form>
    </section>
  );
}
