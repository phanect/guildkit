const scriptDirPath = path self | path dirname
const projectRootPath = $scriptDirPath | path join ".." | path expand
const dotEnvPath = $projectRootPath | path join ".env" | path expand

def type [cmd] {
  return (0 < (which $cmd | length))
}

def --wrapped container [ ...args ] {
  if (type podman) {
    (podman ...$args)
  } else if (type docker) {
    (docker ...$args)
  } else {
    print "[ERROR] Neither Docker nor Podman are found. Please install one of them."
    exit 1
  }
}

if ($dotEnvPath | path exists) {
  open --raw $dotEnvPath | from toml | load-env
}

if not ("NODE_ENV" in $env) {
  print "[ERROR] The environment variable NODE_ENV is missing. If you are on your local machine, copy .env.example to .env, or set `NODE_ENV=development` manually."
  exit 1
}

let isLocal = ($env.NODE_ENV == "development")

def "main resetdb" [] {
  container compose down --rmi local --volumes --remove-orphans
  main sync --seed
}

def "main sync" [--seed] {
  pnpm svelte-kit sync

  # Generate DB Schemas: Currency codes
  pnpm jiti ($scriptDirPath | path join "scripts-sync-currency.ts")

  # Generate DB Schemas: BetterAuth
  ## Requires to proerly load auth.ts which imports the generated BetterAuth schema.
  cp ($scriptDirPath | path join "fixtures/barrel-dummy.ts") ($projectRootPath | path join "src/lib/db/schema/index.ts")
  # TODO replace deprecated `--y` option with `--yes` after better-auth/better-auth#3749 is released.
  # https://github.com/better-auth/better-auth/pull/3749
  pnpx @better-auth/cli generate --y --output="./src/lib/db/schema/better-auth.ts" # relative path from project root

  # Generate barrel file for schemas
  pnpm jiti ($scriptDirPath | path join "scripts-sync-barrel.ts")

  if ($isLocal) {
    container compose up -d --wait
    pnpm drizzle-kit generate
    pnpm drizzle-kit migrate

    if ($seed) {
      pnpm jiti ./scripts/seed.ts
    }
  } else {
    pnpm drizzle-kit generate
    pnpm drizzle-kit migrate
  }
}

# Required to run subcommands
def main [] {}
