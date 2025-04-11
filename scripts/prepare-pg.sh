#!/usr/bin/env bash

set -eu

# If this script runs on Ubuntu or Ubuntu-based systems, install dependencies required to build Postgres

type apt-get &> /dev/null
(ls /etc/apt/sources.list && cat /etc/apt/sources.list | grep ubuntu.com) &> /dev/null

if dpkg -l "linux-headers-$(uname -r)" build-essential libssl-dev libreadline-dev zlib1g-dev libcurl4-openssl-dev uuid-dev icu-devtools libicu-dev libbison-dev flex > /dev/null; then
  exit 0
fi

echo "Installing build dependencies for PostgreSQL from apt repository. Enter your sudo password to install."

sudo apt-get install linux-headers-$(uname -r) build-essential libssl-dev libreadline-dev zlib1g-dev libcurl4-openssl-dev uuid-dev icu-devtools libicu-dev libbison-dev flex

echo "Installing PostgreSQL..."

mise up

pg_ctl restart
psql --username=postgres --command="CREATE USER guildkit;" || :
psql --username=postgres --command="ALTER USER guildkit WITH PASSWORD 'guildkit';"
createdb guildkit --username=postgres --owner=guildkit || :
