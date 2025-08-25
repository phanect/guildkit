import "@/lib/styles/globals.css";
import type { ReactElement, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function AuthLayout({ children }: Props): ReactElement {
  return (
    <>
      {children}
    </>
  );
}
