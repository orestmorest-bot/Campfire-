#!/bin/bash
# Double-click this file to start Scripture Opener on a Mac.
cd "$(dirname "$0")"

if ! command -v node >/dev/null 2>&1; then
  echo
  echo "Node.js is not installed yet."
  echo "Please install it from https://nodejs.org (choose the \"LTS\" version),"
  echo "then double-click this file again."
  echo
  read -n 1 -s -r -p "Press any key to close."
  exit 1
fi

if [ ! -d node_modules ]; then
  echo
  echo "First start: installing the app. This happens only once and can take a minute..."
  echo
  npm install
fi

echo
echo "Starting Scripture Opener. Your browser will open by itself."
echo "If it opens in the wrong browser, copy the address http://localhost:5173 into Google Chrome."
echo "Keep this window open while you use the app. Close it to stop the app."
echo
npm run dev -- --open
