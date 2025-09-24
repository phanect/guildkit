"use client"; // error.tsx must be a Client Component

import { CenterBox } from "@/components/generic/CenterBox.tsx";
import { Nav } from "@/components/Nav.tsx";

export default function Error({ error }: {
  error: Error & { digest?: string; };
}) {
  return (
    <>
      <Nav for="guest" />
      <CenterBox>
        <h1>{ error.message }</h1>
        <p>Sorry, this is probably a bug in this website.</p>
      </CenterBox>
    </>
  );
}
