@echo off
echo ======================================
echo Starting Cloudflare Tunnel for Frontend
echo ======================================
echo.
echo Frontend will be available at port 5173
echo Cloudflare will generate a public URL...
echo.

REM Start cloudflared tunnel for frontend (Vite on port 5173)
cloudflared tunnel --url http://localhost:5173
