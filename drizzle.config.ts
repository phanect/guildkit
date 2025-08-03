import { env } from "node:process";
import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  out: "./src/lib/db/migrations",
  schema: "./src/lib/db/schema/",
  strict: true,
  verbose: true,
  dbCredentials: {
    url: env.DATABASE_URL!,
  },
});
