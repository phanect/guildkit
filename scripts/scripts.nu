const scriptDirPath = path self | path dirname
const dotEnvPath = $scriptDirPath | path join "../.env" | path expand

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

def "main periodic" [] {
  jiti ./scripts/periodic-generate.ts

  const newBranch = "bot-rebuild-enum-$(date --iso-8601)"

  git fetch origin
  git switch --create $newBranch
  git add --all

  if (git diff --cached | is-not-empty) {
    git commit --message="feat: rebuild Prisma enum of currency codes"
    gh pr create --base=main
  }
}

def "main resetdb" [] {
  container compose down --rmi local --volumes --remove-orphans
  main sync --seed
}

def "main sync" [--seed] {
  pnpm svelte-kit sync

  # Generate DB Schemas
  pnpm jiti ($scriptDirPath | path join "scripts-sync-currency.ts")

  touch ($scriptDirPath | path join "../tmp/drizzle-schema/better-auth.ts")
  # TODO replace deprecated `--y` option with `--yes` after better-auth/better-auth#3749 is released.
  # https://github.com/better-auth/better-auth/pull/3749
  pnpx @better-auth/cli generate --y --output="./tmp/drizzle-schema/better-auth.ts" # relative path from project root

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
