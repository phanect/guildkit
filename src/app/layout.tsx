import { TopBar } from "@/components/generic/TopBar.tsx";
import { Nav } from "@/components/Nav.tsx";
import "@/lib/styles/globals.css";
import config from "../../guildkit.config.ts";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: config.siteName,
  // TODO Make this modifiable
  description: "A toolkit for building job search services",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode; }>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/logo.png" />
        <meta name="viewport" content="width=device-width" />
      </head>
      <body>
        {/* ▼▼ TODO Pre-alpha caution: Delete on the official release ▼▼ */}
        <TopBar>
          Caution: GuildKit is still pre-alpha state and there are probably a lot of bugs. Do not enter any private information for your security.
        </TopBar>
        {/* ▲▲ Pre-alpha caution ▲▲ */}

        <Nav />
        <main className="flex flex-col items-center gap-4 w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
