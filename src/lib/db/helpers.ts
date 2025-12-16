import { eq, type InferInsertModel } from "drizzle-orm";
import { db } from "./db.ts";
import { userProps } from "./schema/user.ts";
import { user as userTable } from "../../intermediate/better-auth-schema.ts"; // Can't use `@/` since this file isn't managed by Next.js

export const updateUserProps = (user: InferInsertModel<typeof userTable>) => {
  type UpdateFn = typeof db.update<typeof userProps>;
  type SetFn = ReturnType<UpdateFn>["set"];
  type SetParams = Parameters<SetFn>;

  return {
    set: async (...values: SetParams) => db.update(userProps)
      .set(...values)
      .where(eq(userProps.id, user.propsId)),
  };
};
