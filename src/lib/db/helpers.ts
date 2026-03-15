import { eq, type InferInsertModel } from "drizzle-orm";
import { db } from "./db.ts";
import { userProps } from "./schema/user.ts";
import { user as userTable } from "../../intermediate/better-auth-schema.ts"; // Can't use `@/` since this file isn't managed by Next.js

type Transaction = Parameters<Parameters<typeof db.transaction>[0]>[0];

export type UserWithProps = Omit<InferInsertModel<typeof userTable>, "propsId" | "recruitsFor"> & {
  props: InferInsertModel<typeof userProps>;
  recruitsFor?: string[];
};

export const insertUsers = async (users: UserWithProps | UserWithProps[], tx: Transaction) => {
  const usersWithProps = Array.isArray(users) ? users : [ users ];
  const newUserIds: string[] = [];

  // TODO Fix N+1 problem
  for (const userWithProps of usersWithProps) {
    const { props, ...userWithoutProps } = userWithProps;

    const [ newUserProp ] = await tx.insert(userProps).values(props).returning({ id: userProps.id });

    if (!newUserProp) {
      tx.rollback();
    }

    const [ newUser ] = await tx.insert(userTable).values({
      ...userWithoutProps,
      propsId: newUserProp?.id ?? undefined,
    }).returning({ id: userTable.id });

    if (newUser) {
      newUserIds.push(newUser.id);
    } else {
      tx.rollback();
    }
  }

  return newUserIds;
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
