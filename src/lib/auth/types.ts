import type { auth } from "$lib/auth.ts";
import type { UserProps } from "$lib/db/schema/user.ts";

export type User = typeof auth.$Infer.Session["user"] & {
  props: UserProps;
};

export type Session = typeof auth.$Infer.Session["session"];
