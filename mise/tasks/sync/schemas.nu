#!/usr/bin/env nu

# Generate DB Schemas: BetterAuth
## Requires to properly load auth.ts which imports the generated BetterAuth schema.
cp ($tasksDirPath | path join "fixtures/barrel-dummy.ts") ($projectRootPath | path join "src/lib/db/schema/index.ts")
pnpx @better-auth/cli generate --yes --output="./src/lib/db/schema/better-auth.ts" # relative path from project root

# Generate barrel file for schemas
pnpm jiti ($tasksDirPath | path join "libs/scripts-sync-barrel.ts")
