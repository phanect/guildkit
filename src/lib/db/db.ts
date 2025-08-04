import "dotenv/config";
import { eq, type InferInsertModel } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema.ts";

export const db = drizzle({
  connection: {
    connectionString: process.env.DATABASE_URL!,
  },
  schema,
});

export const updateUserProps = (user: InferInsertModel<typeof schema.userTable>) => {
  type UpdateFn = typeof db.update<typeof schema.userPropsTable>;
  type SetFn = ReturnType<UpdateFn>["set"];
  type SetParams = Parameters<SetFn>;

  return {
    set: async (...values: SetParams) => db.update(schema.userPropsTable)
      .set(...values)
      .where(eq(schema.userPropsTable.id, user.propsId)),
  };
};
