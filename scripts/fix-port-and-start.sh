#!/bin/bash
# Run from your project root (e.g. /home/dtbi/ibua/oil-gas)
# 1. Stops container using port 3030
# 2. Changes docker-compose port 3030 -> 2020
# 3. Starts stack on port 2020
set -e

if [ ! -f docker-compose.yml ]; then
  echo "Run this script from the folder that contains docker-compose.yml (e.g. /home/dtbi/ibua/oil-gas)"
  exit 1
fi

echo "Stopping existing frontend container..."
docker stop oil-gas-frontend-1 oil-gas-frontend 2>/dev/null || true
docker rm oil-gas-frontend-1 oil-gas-frontend 2>/dev/null || true

echo "Setting port to 2020 in docker-compose.yml..."
if grep -q '3030:80' docker-compose.yml 2>/dev/null; then
  sed -i.bak 's/"3030:80"/"2020:80"/g; s/3030:80/2020:80/g' docker-compose.yml
  echo "Updated 3030 -> 2020"
elif grep -q '2020:80' docker-compose.yml 2>/dev/null; then
  echo "Already using 2020"
else
  echo "No 3030 or 2020 mapping found - check your ports: section in docker-compose.yml"
fi

echo "Starting containers..."
docker compose up -d --build

echo "Done. App at http://localhost:2020 (or your server IP:2020)"
