#!/usr/bin/env bash
# Smoke tests for a running container.
# Requires PORT and IMAGE_TAG to be set.
set -euo pipefail

BASE_URL="http://localhost:${PORT}"

echo "Waiting for ${BASE_URL}/health ..."
for i in $(seq 1 15); do
  if curl -fsS "${BASE_URL}/health"; then
    echo
    echo "Health check passed"
    break
  fi
  if [ "$i" -eq 15 ]; then
    echo "Health check failed after 15 attempts"
    docker ps -a
    docker logs app || true
    exit 1
  fi
  echo "Attempt $i failed, retrying in 2s..."
  sleep 2
done

ACTUAL_VERSION=$(curl -fsS "${BASE_URL}/version" | jq -r .version)
echo "Expected version: ${IMAGE_TAG}"
echo "Running version:  ${ACTUAL_VERSION}"
if [ "${ACTUAL_VERSION}" != "${IMAGE_TAG}" ]; then
  echo "::error::Deployed container is not running the expected build"
  exit 1
fi

echo "All smoke tests passed"
