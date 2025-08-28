"use client";

import Image from "next/image";
import { Button, Link } from "@/components/generic/ButtonLink.tsx";
import { TopBar } from "@/components/generic/TopBar.tsx";
import { signOut } from "@/lib/auth/client.ts";
import type { UserType } from "@/lib/db/schema/user.ts";
import type { ReactElement } from "react";

type Props = {
  for: UserType | "guest";
};

export const Nav = ({ for: userType }: Props): ReactElement => (
  <>
    {/* ▼▼ TODO Pre-alpha caution: Delete on the official release ▼▼ */}
    <TopBar>
      Caution: GuildKit is still pre-alpha state and there are probably a lot of bugs. Do not enter any private information for your security.
    </TopBar>
    {/* ▲▲ Pre-alpha caution ▲▲ */}

    <nav className="flex items-center justify-between flex-wrap py-6 px-20">
      <Link href="/" className="flex items-center gap-3 text-gray-900 text-xl font-semibold">
        <Image
          src="https://tmp.guildkit.net/canvaai/guildkit_icon_tmp.png"
          width={64}
          height={64}
          alt=""
          decoding="async"
        />
        <span>GuildKit</span>
      </Link>
      <div className="flex items-center gap-4">
        {(userType === "recruiter" || userType === "administrative") && (
          <Link href="/employer/jobs" theme="none" className="mr-8 font-bold">
            Dashboard
          </Link>
        )}

        {userType === "guest" ? (
          <Link href="/auth" theme="button-deep">Log in <span className="after:content-['|'] after:text-gray-500"></span> Sign up</Link>
        ) : (
          <Button theme="button-pale" onClick={() => void signOut()}>Log out</Button>
        )}
      </div>
    </nav>
  </>
);
