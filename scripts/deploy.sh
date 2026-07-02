#!/usr/bin/env bash
#
# Production deploy for gfa.rwims.com
# Run this ON THE SERVER (ssh rwadmin@server), from the app directory:
#     cd /www/wwwroot/gfa.rwims.com && bash scripts/deploy.sh
#
# It pulls the latest master, installs deps, rebuilds the Next.js app,
# and restarts the running process so prerendered pages (e.g. /news) update.

set -euo pipefail

APP_DIR="/www/wwwroot/gfa.rwims.com"
BRANCH="master"
PM2_NAME="gfa"            # change if your pm2 process has a different name
SERVICE_NAME="gfa"       # change if you use a different systemd unit name

cd "$APP_DIR"

echo "==> Fetching latest code ($BRANCH)"
git fetch origin "$BRANCH"
git reset --hard "origin/$BRANCH"

echo "==> Installing dependencies"
# react-simple-maps@3 pins React <=18, so legacy-peer-deps is required
npm install --legacy-peer-deps

echo "==> Building (next build --webpack)"
npm run build

echo "==> Restarting app"
if command -v pm2 >/dev/null 2>&1 && pm2 describe "$PM2_NAME" >/dev/null 2>&1; then
  pm2 restart "$PM2_NAME" --update-env
  pm2 save
elif systemctl list-units --type=service 2>/dev/null | grep -q "$SERVICE_NAME"; then
  sudo systemctl restart "$SERVICE_NAME"
else
  echo "!! No pm2 process '$PM2_NAME' or systemd service '$SERVICE_NAME' found."
  echo "!! Restart the Next.js process manually (whatever runs 'next start')."
  exit 1
fi

echo "==> Done. Verify: https://gfa.rwims.com/news"
