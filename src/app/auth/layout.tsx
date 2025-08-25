import "@/lib/styles/global.postcss";
import type { ReactElement, ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: LayoutProps): ReactElement {
  return (
    <>
      {children}
    </>
  );
}
