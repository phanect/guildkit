import Image from "next/image";
import { Button, Link } from "@/components/generic/ButtonLink.tsx";
import { TopBar } from "@/components/generic/TopBar.tsx";
import { signOut } from "@/lib/auth/client.ts";
import type { UserType } from "@/lib/db/schema/user.ts";
import styles from "./Nav.module.scss";
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

    <nav className="nav flex items-center justify-between flex-wrap py-6 px-20">
      <Link href="/" className={styles.title}>
        <Image
          src="https://tmp.guildkit.net/canvaai/guildkit_icon_tmp.png"
          width="64"
          height="64"
          alt=""
          decoding="async"
        />
        <span className={styles.titleText}>GuildKit</span>
      </Link>
      <div className={styles.rightSection}>
        {(userType === "recruiter" || userType === "administrative") && (
          <Link href="/employer/jobs" className={styles.dashboardLink}>
            Dashboard
          </Link>
        )}

        {userType === "guest" ? (
          <Link href="/auth" theme="button-deep">Log in <span className={styles.textSeparator}></span> Sign up</Link>
        ) : (
          <Button theme="button-pale" onClick={() => void signOut()}>Log out</Button>
        )}
      </div>
    </nav>
  </>
);
