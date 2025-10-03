const tasksDirPath = path self | path dirname | path join ".."
const projectRootPath = $tasksDirPath | path join ".." | path expand

def type [cmd] {
  return (0 < (which $cmd | length))
}

export def --wrapped container [ ...args ] {
  if (type podman) {
    (podman ...$args)
  } else if (type docker) {
    (docker ...$args)
  } else {
    print "[ERROR] Neither Docker nor Podman are found. Please install one of them."
    exit 1
  }
}

export def sync [--seed] {
  if not ("SERVER_ENV" in $env) {
    print "[ERROR] The environment variable SERVER_ENV is missing. If you are on your local machine, copy .env.example to .env, or set `SERVER_ENV=development` manually."
    exit 1
  }



  if ($env.SERVER_ENV == "development") {
    container compose up -d --wait
  } else if ($env.SERVER_ENV == "demo-preview") {
    pnpm neon branches reset $"preview/($env.VERCEL_GIT_COMMIT_REF)" --parent --project-id=($env.NEON_PROJECT_ID)
  }

  pnpm drizzle-kit generate
  pnpm drizzle-kit migrate

  if (($env.SERVER_ENV == "development" or $env.SERVER_ENV == "demo-preview") and $seed) {
    pnpm jiti ./scripts/seed.ts
  }
}
