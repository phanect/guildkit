import { Nav } from "@/components/Nav.tsx";
import { Sidebar } from "@/components/Sidebar.tsx";
import { requireAuthAs } from "@/lib/auth/server.ts";
import type { ReactElement, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default async function EmployerLayout({ children }: Props): Promise<ReactElement> {
  const { user } = await requireAuthAs("recruiter");

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
