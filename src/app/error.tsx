"use client"; // error.tsx must be a Client Component

import { Link } from "@/components/generic/ButtonLink.tsx";
import { CenterBox } from "@/components/generic/CenterBox.tsx";
import { Nav } from "@/components/Nav.tsx";
import { RecruiterWithoutOrgError } from "@/lib/utils/errors.ts";

export default function Error({ error }: {
  error: Error & { digest?: string; };
}) {
  // error instanceof RecruiterWithoutOrgError does not work here.
  // I guess the received error from server side and RecruiterWithoutOrgError
  // defined in client side may be differ
  return (
    <>
      <Nav for="guest" />
      <CenterBox>
        {
          error.name === RecruiterWithoutOrgError.name ? (
            <p>
              You do not belong to any organization.<br />
              <Link href="/orgs/new" theme="linktext" prefetch>
                Create a new organization
              </Link> or ask your organization owner to add you.
              {/* TODO Add button to ask invitation to the org in the organization page */}
            </p>
          ) : (
            <h1>{ error.message }</h1>
          )
        }
      </CenterBox>
    </>
  );
}
