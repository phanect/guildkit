import { requireAuthAs } from "@/lib/auth/server.ts";
import NewOrgPageClient from "./page.client.tsx";
import type { ReactElement } from "react";

export default async function NewOrgPage(): Promise<ReactElement> {
  await requireAuthAs("recruiter", { allowOrphanRecruiter: true });

  return <NewOrgPageClient />;
}
