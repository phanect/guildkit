import { reset } from "drizzle-seed";
import { db } from "../src/lib/db/db.ts";
import * as schema from "../src/lib/db/schema.ts";

await reset(db, schema);
