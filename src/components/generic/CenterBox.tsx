import type { ReactElement, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function CenterBox({ children }: Props): ReactElement {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="flex flex-col items-center">
        {children}
      </div>
    </div>
  );
}
