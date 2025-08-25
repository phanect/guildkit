"use client"; // error.tsx must be a Client Component

import { Link } from "@/components/generic/ButtonLink.tsx";

export default function Error({ error }: {
  error: Error & { digest?: string; };
}) {
  return error.cause === "RECRUITER_WITHOUT_ORG" ? (
    <p>
      You do not belong to any organization.
      <Link href="/employer/orgs/new" theme="linktext" prefetch>
        Create a new organization
      </Link> or ask your organization owner to add you.
      {/* TODO Add button to ask invitation to the org in the organization page */}
    </p>
  ) : error.cause === 404 ? (
    <h1>This page is not found.</h1>
  ) : (
    <h1>{ error.message }</h1>
  );
}
