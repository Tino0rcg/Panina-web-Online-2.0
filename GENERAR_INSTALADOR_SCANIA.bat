@echo off
TITLE GENERADOR DE INSTALADOR SCANIA
color 0e

echo ===================================================
echo   PREPARANDO AMBIENTE PARA COMPILACION
echo ===================================================
echo.

:: 1. Limpiar procesos activos para evitar bloqueos de archivos
echo [+] Cerrando procesos activos (Node, Electron)...
taskkill /F /IM node.exe /T >nul 2>&1
taskkill /F /IM electron.exe /T >nul 2>&1

:: 2. Construir aplicacion Next.js en modo Standalone
echo [+] Construyendo aplicacion Web (Next.js Standalone)...
cd /d "%~dp0control-acceso"
call npm run build

:: 3. Preparar recursos para Electron
echo [+] Preparando recursos para el instalador...
if not exist "%~dp0control-acceso-desktop\resources" mkdir "%~dp0control-acceso-desktop\resources"
:: Copiar DB actual para que el instalador la incluya
copy /y "%~dp0control-acceso\prisma\dev.db" "%~dp0control-acceso-desktop\resources\dev.db"

:: 4. Construir el Instalador .EXE
echo [+] Generando instalador profesional .EXE...
cd /d "%~dp0control-acceso-desktop"
:: Limpiar dist anterior
if exist dist rd /s /q dist
call npm run build

echo.
echo ===================================================
echo   PROCESO COMPLETADO
echo   El instalador se encuentra en: control-acceso-desktop\dist
echo ===================================================
pause
