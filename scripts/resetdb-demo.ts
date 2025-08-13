import { sql } from "drizzle-orm";
import { db } from "../src/lib/db/db.ts";

console.info("Dropping all the tables...");

const isValidTableName = (name: string): boolean => {
  // PostgreSQL identifiers start with letter or underscore, then letters, digits, or underscores
  return /^[A-Za-z_][A-Za-z0-9_]*$/.test(name);
};

//
// Tables
//
const tableRows = (await db.execute(
  sql`SELECT tablename from pg_tables where schemaname = 'public'`
)).rows;

// Filter and validate table names, then construct DROP statements
const tableStatements = tableRows
  .map((row) => row.tablename as string)
  .filter(isValidTableName)
  .map((tablename) => `DROP TABLE IF EXISTS "${ tablename }" CASCADE;`);

//
// Enums
//
const enumRows = (await db.execute(
  sql`SELECT typetable.typname as enum_name FROM pg_type typetable
    JOIN pg_enum enumtable ON typetable.oid = enumtable.enumtypid
    WHERE typetable.typnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')
    GROUP BY typetable.typname`
)).rows;

// Filter and validate enum names, then construct DROP TYPE statements
const enumStatements = enumRows
  .map((row) => row.enum_name as string)
  .filter(isValidTableName)
  .map((enumName) => `DROP TYPE IF EXISTS "${ enumName }" CASCADE;`);

//
// Execute
//

// Allow N+1 problem since this is a dev script
for (const statement of [ ...tableStatements, ...enumStatements ]) {
  await db.execute(sql.raw(statement));
}

await db.execute(sql`DROP SCHEMA drizzle CASCADE;`);

console.info("All the table has been dropped.");
