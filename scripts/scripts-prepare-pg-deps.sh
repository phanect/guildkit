#!/usr/bin/env bash

set -eu

# TODO Rewrite in Nushell

# Check system dependencies
type mise

# If this script runs on Ubuntu or Ubuntu-based systems, install dependencies required to build Postgres

type apt-get > /dev/null || exit
type dpkg > /dev/null || exit
(cat /etc/apt/sources.list /etc/apt/sources.list.d/* | grep "archive.ubuntu.com") > /dev/null || exit

dpkg -l "linux-headers-$(uname -r)" build-essential libssl-dev libreadline-dev zlib1g-dev libcurl4-openssl-dev uuid-dev icu-devtools libicu-dev libbison-dev flex > /dev/null && exit

echo "Installing build dependencies for PostgreSQL from apt repository. Enter your sudo password to install."

sudo apt-get install linux-headers-$(uname -r) build-essential flex icu-devtools llibbison-dev ibicu-dev libssl-dev libreadline-dev zlib1g-dev libcurl4-openssl-dev pkg-config uuid-dev

echo "Installing PostgreSQL..."
