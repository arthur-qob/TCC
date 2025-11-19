@echo off

echo ======================================
echo Updating Frontend .env with current IP
echo ======================================
cd frontend
call update-ip.bat
cd ..

echo.
echo ======================================
echo Updating Backend .env with current IP
echo ======================================
call update-backend-env.bat

echo.
echo ======================================
echo Environment files updated successfully
echo ======================================
pause
