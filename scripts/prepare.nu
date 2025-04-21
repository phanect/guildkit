export def "main pg deps" [] {
  # Not required on Vercel build server
  if $env.VERCEL? == "1" {
    exit
  }

  # Check system dependencies
  which mise

  # If this script runs on Ubuntu or Ubuntu-based systems, install dependencies required to build Postgres

  try {
    which apt-get
    which dpkg
    open --raw /etc/apt/sources.list /etc/apt/sources.list.d/* | str contains "archive.ubuntu.com"

    try {
      dpkg -l linux-headers-(uname | get kernel-release) build-essential libssl-dev libreadline-dev zlib1g-dev libcurl4-openssl-dev uuid-dev icu-devtools libicu-dev libbison-dev flex | ignore
      exit
    }
  } catch {
    exit
  } | print "Installing build dependencies for PostgreSQL from apt repository. Enter your sudo password to install."

  sudo apt-get install linux-headers-(uname | get kernel-release) build-essential flex icu-devtools llibbison-dev ibicu-dev libssl-dev libreadline-dev zlib1g-dev libcurl4-openssl-dev pkg-config uuid-dev
}

export def "main pg install" [] {
  # Not required on Vercel build server
  if $env.VERCEL? == "1" {
    exit
  }

  let projectRoot = $env.FILE_PWD | path join ".." | path expand
  let pgDataRoot = $projectRoot | path join "tmp/pgdata"

  mise up

  if ($pgDataRoot | path exists) {
    pnpm db:restart
  } else {
    mkdir ($pgDataRoot)
    mise x -- initdb --pgdata=($pgDataRoot) --username=postgres

    pnpm db:restart

    mise x -- psql --username=postgres --command="CREATE USER guildkit WITH CREATEDB PASSWORD 'guildkit';"
    mise x -- psql --username=postgres --command="CREATE DATABASE guildkit OWNER = guildkit;"
    mise x -- psql --username=postgres --command="GRANT ALL PRIVILEGES ON DATABASE guildkit TO guildkit;"
  }
}

# Required to run subcommands
def main [] {}
