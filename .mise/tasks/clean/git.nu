#!/usr/bin/env nu

git clean -dX --exclude="!.env" --exclude="!mise.local.toml" --force
