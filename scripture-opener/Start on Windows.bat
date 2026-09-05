@echo off
rem Double-click this file to start Scripture Opener on Windows.
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo.
  echo Node.js is not installed yet.
  echo Please install it from https://nodejs.org (choose the "LTS" version),
  echo then double-click this file again.
  echo.
  pause
  exit /b 1
)

if not exist node_modules (
  echo.
  echo First start: installing the app. This happens only once and can take a minute...
  echo.
  call npm install
)

echo.
echo Starting Scripture Opener. Your browser will open by itself.
echo If it opens in the wrong browser, copy the address http://localhost:5173 into Google Chrome or Microsoft Edge.
echo Keep this black window open while you use the app. Close it to stop the app.
echo.
call npm run dev -- --open
pause
