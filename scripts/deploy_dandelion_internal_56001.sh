#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
RUN_DIR="${ROOT_DIR}/.run"
BACKEND_SCREEN="dandelion-backend-8000"
BACKEND_LOG="${RUN_DIR}/dandelion-backend-8000.log"

mkdir -p "${RUN_DIR}"

echo "Deploying Dandelion internal experience:"
echo "  Frontend: http://127.0.0.1:56001"
echo "  Backend:  http://127.0.0.1:8000"

echo "Seeding dynamic form configs..."
"${ROOT_DIR}/packages/backend/.venv/bin/python" "${ROOT_DIR}/scripts/seed_form_config.py" --env-file "${ROOT_DIR}/clients/dandelion/backend/.env"

echo "Starting backend..."
if command -v screen >/dev/null 2>&1; then
  screen -S "${BACKEND_SCREEN}" -X quit >/dev/null 2>&1 || true
  screen -dmS "${BACKEND_SCREEN}" bash -lc "cd '${ROOT_DIR}' && packages/backend/.venv/bin/python clients/dandelion/backend/main.py > '${BACKEND_LOG}' 2>&1"
else
  nohup "${ROOT_DIR}/packages/backend/.venv/bin/python" "${ROOT_DIR}/clients/dandelion/backend/main.py" > "${BACKEND_LOG}" 2>&1 &
fi

echo "Waiting for backend..."
python3 - <<'PY'
import time
from urllib.request import urlopen

for _ in range(40):
    try:
        with urlopen("http://127.0.0.1:8000/api/forms/audit_request", timeout=2) as response:
            if response.status == 200:
                print("Backend smoke passed: /api/forms/audit_request -> 200")
                raise SystemExit(0)
    except Exception:
        time.sleep(0.5)
raise SystemExit("Backend smoke failed")
PY

"${ROOT_DIR}/scripts/deploy_dandelion_frontend_56001.sh"

echo "Internal deployment complete."
