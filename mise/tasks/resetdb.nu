#!/usr/bin/env nu

use ./libs *

container compose down --rmi local --volumes --remove-orphans
sync --seed
