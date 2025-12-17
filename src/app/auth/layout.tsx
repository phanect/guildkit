import { CenterBox } from "@/components/generic/CenterBox.tsx";
import type { ReactElement, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function AuthLayout({ children }: Props): ReactElement {
  return (
    <CenterBox className="w-full">
      {children}
    </CenterBox>
  );
}
