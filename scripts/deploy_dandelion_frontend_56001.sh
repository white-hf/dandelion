#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
FRONTEND_DIR="${ROOT_DIR}/clients/dandelion/frontend"
RUN_DIR="${ROOT_DIR}/.run"
PID_FILE="${RUN_DIR}/dandelion-frontend-56001.pid"
LOG_FILE="${RUN_DIR}/dandelion-frontend-56001.log"
SCREEN_NAME="dandelion-frontend-56001"
PORT="${PORT:-56001}"
BIND_HOST="${BIND_HOST:-0.0.0.0}"
SERVE_MODE="${SERVE_MODE:-dev}"

mkdir -p "${RUN_DIR}"

echo "Deploying Dandelion frontend to http://127.0.0.1:${PORT}"

cd "${FRONTEND_DIR}"

if [ ! -d "node_modules" ]; then
  echo "Installing frontend dependencies..."
  npm install
fi

echo "Building frontend..."
npm run build

if command -v screen >/dev/null 2>&1; then
  screen -S "${SCREEN_NAME}" -X quit >/dev/null 2>&1 || true
fi

if [ -f "${PID_FILE}" ]; then
  OLD_PID="$(cat "${PID_FILE}")"
  if kill -0 "${OLD_PID}" 2>/dev/null; then
    echo "Stopping existing frontend process ${OLD_PID}..."
    kill "${OLD_PID}" || true
    sleep 1
  fi
  rm -f "${PID_FILE}"
fi

echo "Starting frontend (${SERVE_MODE})..."
if command -v screen >/dev/null 2>&1; then
  if [ "${SERVE_MODE}" = "standalone" ] && [ -f ".next/standalone/server.js" ]; then
    cp -R .next/static .next/standalone/.next/static
    if [ -d "public" ]; then
      cp -R public .next/standalone/public
    fi
    screen -dmS "${SCREEN_NAME}" bash -lc "cd '${FRONTEND_DIR}/.next/standalone' && PORT='${PORT}' HOSTNAME='${BIND_HOST}' node server.js > '${LOG_FILE}' 2>&1"
  else
    screen -dmS "${SCREEN_NAME}" bash -lc "cd '${FRONTEND_DIR}' && ./node_modules/.bin/next dev -H '${BIND_HOST}' -p '${PORT}' > '${LOG_FILE}' 2>&1"
  fi
  echo "screen:${SCREEN_NAME}" > "${PID_FILE}"
elif [ "${SERVE_MODE}" = "standalone" ] && [ -f ".next/standalone/server.js" ]; then
  cp -R .next/static .next/standalone/.next/static
  if [ -d "public" ]; then
    cp -R public .next/standalone/public
  fi
  (cd .next/standalone && nohup env PORT="${PORT}" HOSTNAME="${BIND_HOST}" node server.js > "${LOG_FILE}" 2>&1 & echo $! > "${PID_FILE}")
else
  nohup ./node_modules/.bin/next dev -H "${BIND_HOST}" -p "${PORT}" > "${LOG_FILE}" 2>&1 &
  echo "$!" > "${PID_FILE}"
fi
NEW_PID="$(cat "${PID_FILE}")"

echo "Waiting for server..."
python3 - <<PY
import time
from urllib.request import urlopen

url = "http://127.0.0.1:${PORT}/"
last_error = None
for _ in range(40):
    try:
        with urlopen(url, timeout=2) as response:
            if response.status == 200:
                print(f"Smoke passed: {url} -> 200")
                raise SystemExit(0)
    except Exception as exc:
        last_error = exc
        time.sleep(0.5)

raise SystemExit(f"Smoke failed for {url}: {last_error}")
PY

echo "Dandelion frontend is running:"
echo "  URL: http://127.0.0.1:${PORT}"
echo "  PID: ${NEW_PID}"
echo "  Log: ${LOG_FILE}"
