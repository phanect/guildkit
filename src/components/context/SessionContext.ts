import { createContext } from "react";
import type { User, Session } from "@/lib/auth/types.ts";

export const SessionContext = createContext<{ user?: User; session?: Session; }>({});
