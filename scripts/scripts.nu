const scriptDirPath = path self | path dirname
const dotEnvPath = $scriptDirPath | path join "../.env" | path expand

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
  podman compose down --rmi local --volumes --remove-orphans
  main sync
}

def "main sync" [] {
  pnpm svelte-kit sync

  if ($isLocal) {
    podman compose up -d --wait
    pnpm prisma migrate dev
  } else {
    pnpm prisma generate
  }
}

# Required to run subcommands
def main [] {}
