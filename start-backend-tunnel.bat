@echo off
echo ======================================
echo Starting Cloudflare Tunnel for Backend
echo ======================================
echo.
echo Backend will be available at port 8080
echo Cloudflare will generate a public URL...
echo.

REM Start cloudflared tunnel for backend (Spring Boot on port 8080)
cloudflared tunnel --url http://localhost:8080
