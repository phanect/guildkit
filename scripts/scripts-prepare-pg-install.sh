#!/usr/bin/env bash

set -eu

# TODO Rewrite in Nushell

DIRNAME="$(realpath "$(dirname  -- "${BASH_SOURCE[0]}")")"
PROJECT_ROOT="$(realpath "${DIRNAME}/..")"
PGDATA_ROOT="${PROJECT_ROOT}/tmp/pgdata"

mise up
eval "$(mise activate bash)"

if [[ ! -d "${PGDATA_ROOT}" ]]; then
  mkdir --parents "${PGDATA_ROOT}"
  initdb --pgdata="${PGDATA_ROOT}" --username=postgres

  pnpm db:restart

  psql --username=postgres --command="CREATE USER guildkit WITH CREATEDB PASSWORD 'guildkit';"
  psql --username=postgres --command="CREATE DATABASE guildkit OWNER = guildkit;"
  psql --username=postgres --command="GRANT ALL PRIVILEGES ON DATABASE guildkit TO guildkit;"
else
  pnpm db:restart
fi
