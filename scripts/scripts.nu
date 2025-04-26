const dotEnvPath = path self | path dirname | path join "../.env" | path expand

if ($dotEnvPath | path exists) {
  open --raw $dotEnvPath | from toml | load-env
}

if not ("NODE_ENV" in $env) {
  print "[ERROR] The environment variable NODE_ENV is missing. If you are on your local machine, copy .env.example to .env, or set `NODE_ENV=development` manually."
  exit 1
}

let isLocal = ($env.NODE_ENV == "development")

def "main sync" [] {
  pnpm svelte-kit sync

  if ($isLocal) {
    pnpm prisma migrate dev
  }
}

def "main prepare" [] {
  main sync
}

# Required to run subcommands
def main [] {}
