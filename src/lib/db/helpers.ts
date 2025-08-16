import "dotenv/config";
import { eq, type InferInsertModel } from "drizzle-orm";
import { db } from "./db.ts";
import { user as userTable } from "./schema/better-auth.ts";
import { userProps } from "./schema/user.ts";

export type UserWithProps = Omit<InferInsertModel<typeof userTable>, "propsId"> & {
  props: InferInsertModel<typeof userProps>;
};

export const insertUsers = async (users: UserWithProps | UserWithProps[]) => {
  const usersWithProps = Array.isArray(users) ? users : [ users ];

  // TODO Fix N+1 problem
  await db.transaction(async (tx) => {
    for (const userWithProps of usersWithProps) {
      const { props, ...userWithoutProps } = userWithProps;

      const [{ propsId }] = await tx.insert(userProps).values(props).returning({ propsId: userProps.id });

      await tx.insert(userTable).values({
        ...userWithoutProps,
        propsId: propsId,
      });
    }
  });
};

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
