import "dotenv/config";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { userPropsTable, type User } from "./schema.ts";

export const db = drizzle({
  connection: {
    connectionString: process.env.DATABASE_URL!,
  },
});

export const updateUserProps = ({ user }: { user: User; }) => {
  type UpdateFn = typeof db.update<typeof userPropsTable>;
  type SetFn = ReturnType<UpdateFn>["set"];
  type SetParams = Parameters<SetFn>;

  return {
    set: async (...values: SetParams) => db.update(userPropsTable)
      .set(...values)
      .where(eq(userPropsTable.id, user.propsId)),
  };
};
