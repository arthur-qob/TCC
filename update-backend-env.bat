@echo off
REM Get the IPv4 address
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /C:"IPv4"') do (
    for /f "tokens=1" %%b in ("%%a") do (
        set IP=%%b
        goto :found
    )
)
:found

REM Update backend .env file
echo # This file is auto-updated with the current network IP> backend\.env
echo FRONTEND_URL=http://%IP%:5173>> backend\.env

echo Backend .env updated with IP: %IP%
echo FRONTEND_URL=http://%IP%:5173
