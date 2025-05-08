const scriptDirPath = path self | path dirname
const dotEnvPath = $scriptDirPath | path join "../.env" | path expand
const pgDataDirPath = $scriptDirPath | path join "../tmp/pgdata" | path expand
const pgLogPath = $scriptDirPath | path join "../tmp/postgresql.log" | path expand

if ($dotEnvPath | path exists) {
  open --raw $dotEnvPath | from toml | load-env
}

if not ("NODE_ENV" in $env) {
  print "[ERROR] The environment variable NODE_ENV is missing. If you are on your local machine, copy .env.example to .env, or set `NODE_ENV=development` manually."
  exit 1
}

let isLocal = ($env.NODE_ENV == "development")

def "main dev" [] {
  main sync --startdb
  pnpm vite dev
}

def "main restartdb" [] {
  try {
    print "restarting..."
    mise x -- pg_ctl --pgdata=($pgDataDirPath) -l ($pgLogPath) --options=$"-D ($pgDataDirPath)" restart
    print "restarted"
  } catch {
    print "starting..."
    mise x -- pg_ctl --pgdata=($pgDataDirPath) -l ($pgLogPath) --options=$"-D ($pgDataDirPath)" start
    print "started"
  }
}

def "main stopdb" [] {
  try {
    mise x -- pg_ctl --pgdata=($pgDataDirPath) -l ($pgLogPath) --options=$"-D ($pgDataDirPath)" stop
  }
}

def "main sync" [--startdb] {
  pnpm svelte-kit sync

  if ($isLocal) {
    main restartdb
    pnpm prisma migrate dev

    if not $startdb {
      main stopdb
    }
  } else {
    pnpm prisma generate
  }
}

def "main prepare" [] {
  if ($isLocal) {
    bash ($scriptDirPath | path join "scripts-prepare-pg-deps.sh")
    bash ($scriptDirPath | path join "scripts-prepare-pg-install.sh")
  }

  main sync
}

# Required to run subcommands
def main [] {}
