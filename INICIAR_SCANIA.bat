@echo off
TITLE ARRANCADOR - SISTEMA SCANIA
color 0b

echo ===================================================
echo   INICIANDO TODO EL ECOSISTEMA SCANIA (Kiosko + Movil)
echo ===================================================
echo.

cd /d "%~dp0control-acceso"
call INICIAR_SISTEMA_SCANIA.bat
