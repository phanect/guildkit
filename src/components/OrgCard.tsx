"use client";

import { Link } from "@/components/generic/ButtonLink.tsx";
import type { ReactElement } from "react";
import type { Organization } from "@/lib/prisma/client.ts";

export type OrgCardInfo = Pick<Organization, "id" | "name" | "slug" | "about">;

type OrgCardProps = {
  org: OrgCardInfo;
};

export const OrgCard = ({ org }: OrgCardProps): ReactElement => {
  return (
    <Link theme="none" href={`/@/${ org.slug }`} className="flex flex-col gap-3 bg-white shadow-around shadow-gray-200 hover:shadow-gray-300 transition-shadow duration-300 rounded-lg w-full max-w-[32.5rem] p-4">
      <h3 className="text-xl font-bold text-gray-900 line-clamp-2 mb-2 leading-6 h-12">
        {org.name}
      </h3>
      <div className="text-sm text-gray-600 line-clamp-2 h-10">
        {org.about}
      </div>
    </Link>
  );
};
