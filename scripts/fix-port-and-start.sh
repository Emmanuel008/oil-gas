#!/bin/bash
# Stop and remove any existing oil-gas frontend container to free the port, then start on 2020.
set -e
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$ROOT_DIR"
if [ ! -f docker-compose.yml ]; then
  echo "Error: docker-compose.yml not found in $ROOT_DIR"
  exit 1
fi

echo "Stopping any existing oil-gas frontend containers..."
docker stop oil-gas-frontend-1 oil-gas-frontend 2>/dev/null || true
docker rm oil-gas-frontend-1 oil-gas-frontend 2>/dev/null || true

echo "Starting on port 2020..."
docker compose up -d --build

echo "Done. App should be at http://localhost:2020"
