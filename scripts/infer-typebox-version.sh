#!/usr/bin/env bash

# Infers TypeBox version from Elysia's package.json
# As described in the documentation read below
# https://elysiajs.com/integrations/drizzle.html#installation

# Infer TypeBox version from Elysia's package.json
VERSION=$(grep "@sinclair/typebox" node_modules/elysia/package.json \
    | sed -E 's/.*"@sinclair\/typebox": *"([^*]+)".*/\1/')

# Add TypeBox version to package.json.tmp
jq --arg ver "$VERSION" '.overrides["@sinclair/typebox"]=$ver' package.json > package.json.tmp

# Backup package.json to package.json.bak
cp package.json package.json.bak

# Restore package.json.tmp to package.json
mv package.json.tmp package.json
