#!/bin/sh
jsfiles=$(find . -name '*.js' | grep -v node_modules | tr '\n' ' ')
[ -z "$jsfiles" ] && exit 0

# Prettify all staged .js files
echo "$jsfiles" | xargs ./node_modules/.bin/prettier --write
