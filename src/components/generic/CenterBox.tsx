import type { ReactElement, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function CenterBox({ children }: Props): ReactElement {
  return (
    <div className="flex flex-col items-center">
      {children}
    </div>
  );
}
