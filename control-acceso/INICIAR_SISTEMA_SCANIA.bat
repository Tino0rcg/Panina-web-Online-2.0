@echo off
TITLE SISTEMA DE CONTROL DE ACCESO SCANIA
color 0b

echo ===================================================
echo   INICIANDO SISTEMA DE ACCESO Y PUENTE MOVIL
echo ===================================================
echo.

:: 1. Iniciar el Puente de Escaneo en una ventana separada
echo [+] Iniciando Puente Movil (Puerto 3001)...
start "PUENTE MOVIL SCANIA" cmd /k "cd /d ""%~dp0"" && node bridge-server.js"

:: 2. Iniciar la aplicacion de escritorio (Kiosko Electron + Next.js Produccion)
echo [+] Iniciando Kiosko de Escritorio...
cd /d %~dp0\..\control-acceso-desktop
npm start

pause
