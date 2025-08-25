import styles from "./TopBar.module.scss";
import type { ReactElement, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const TopBar = ({ children }: Props): ReactElement => (
  <div className={styles.topBar}>
    {children}
  </div>
);
