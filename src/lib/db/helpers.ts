import { eq, type InferInsertModel } from "drizzle-orm";
import { db } from "./db.ts";
import { userProps } from "./schema/user.ts";
import type { user as userTable } from "./schema/better-auth.ts";

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
