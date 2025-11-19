@echo off
echo ======================================
echo Starting Cloudflare Tunnels
echo ======================================
echo.
echo Este script vai abrir 2 novas janelas:
echo   1. Backend Tunnel (porta 8080)
echo   2. Frontend Tunnel (porta 5173)
echo.
echo IMPORTANTE:
echo - Anote as URLs geradas em cada janela
echo - Depois execute: update-cloudflare-env.bat
echo.
pause

REM Start backend tunnel in new window
start "Cloudflare Tunnel - Backend" cmd /k "echo Backend Tunnel (porta 8080) && echo. && cloudflared tunnel --url http://localhost:8080"

REM Wait a moment before starting the second tunnel
timeout /t 2 /nobreak >nul

REM Start frontend tunnel in new window
start "Cloudflare Tunnel - Frontend" cmd /k "echo Frontend Tunnel (porta 5173) && echo. && cloudflared tunnel --url http://localhost:5173"

echo.
echo ======================================
echo Tuneis iniciados em novas janelas!
echo ======================================
echo.
echo Proximo passo:
echo   1. Aguarde as URLs aparecerem nas janelas abertas
echo   2. Execute: update-cloudflare-env.bat
echo   3. Insira as URLs quando solicitado
echo.
