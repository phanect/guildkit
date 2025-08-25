import { Nav } from "@/components/Nav.tsx";
import { Sidebar } from "@/components/Sidebar.tsx";
import { requireAuthAs } from "@/lib/auth/server.ts";
import "@/lib/styles/global.css";
import type { ReactElement, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default async function EmployerLayout({ children }: Props): Promise<ReactElement> {
  const { user } = await requireAuthAs("recruiter");

  if (!user) {
    throw new Error("Could not receive user. Sorry, this is probably a bug in GuildKit.");
  }

  return (
    <>
      <Nav for={user.props.type ?? "guest"} />
      <div className="flex justify-center w-full">
        <Sidebar />
        <main className="flex flex-col items-center gap-4 w-full">
          {children}
        </main>
      </div>
    </>
  );
}
