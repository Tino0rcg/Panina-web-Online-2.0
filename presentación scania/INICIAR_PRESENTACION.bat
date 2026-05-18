@echo off
TITLE PRESENTACION SISTEMA SCANIA - ONLINE SYSTEM
color 0b

echo ===================================================
echo   PREPARANDO ENTORNO PARA PRESENTACION SCANIA
echo ===================================================
echo.

:: 1. Iniciar Puente de Escaneo (Puerto 3001)
echo [+] Iniciando Puente de Sincronizacion Movil...
start "PUENTE SCANIA" /min cmd /c "cd /d "%~dp0..\control-acceso" && node bridge-server.js"

:: 2. Iniciar Sistema de Control de Acceso (Puerto 3000)
echo [+] Iniciando Servidor de Aplicacion (Next.js)...
start "SERVIDOR SCANIA" /min cmd /c "cd /d "%~dp0..\control-acceso" && npm run dev"

:: 3. Iniciar Aplicacion de Escritorio (Kiosko)
echo [+] Iniciando Kiosko de Seguridad...
start "KIOSKO SCANIA" /min cmd /c "cd /d "%~dp0..\control-acceso-desktop" && npm start"

:: Esperar un momento para que los servicios calienten
echo [+] Esperando que los servicios esten listos...
timeout /t 5 /nobreak > nul

:: 4. Abrir la Presentacion Interactiva
echo [+] Lanzando Presentacion Interactiva...
start "" "%~dp0PRESENTACION_INTERACTIVA_SCANIA.html"

echo.
echo ===================================================
echo   SISTEMA Y PRESENTACION INICIADOS CORRECTAMENTE
echo ===================================================
echo.
echo Pulse cualquier tecla para cerrar esta ventana de control...
pause > nul
exit
