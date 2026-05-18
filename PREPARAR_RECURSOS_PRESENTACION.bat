@echo off
TITLE PREPARANDO RECURSOS PARA PRESENTACION
color 0b

echo ===================================================
echo   ORGANIZANDO LOGOS Y VIDEOS DE SCANIA
echo ===================================================
echo.

set "SOURCE_BRAIN=C:\Users\Alejandro Contreras\.gemini\antigravity\brain\eede5cbf-a615-4bd1-88e5-ab5edd052d35"
set "DEST_ROOT=%~dp0PRESENTACION_SCANIA"

if not exist "%DEST_ROOT%" mkdir "%DEST_ROOT%"

echo [+] Copiando Logo ONLINE System...
if exist "%~dp0logo_online_system_hd_1.png" (
    copy /y "%~dp0logo_online_system_hd_1.png" "%DEST_ROOT%\logo.png"
)

echo [+] Copiando Videos de funcionalidad (WebP)...
copy /y "%SOURCE_BRAIN%\scania_presentation_complete_v2_1778131627684.webp" "%DEST_ROOT%\video_completo.webp"
copy /y "%SOURCE_BRAIN%\scania_system_overview_1778130779696.webp" "%DEST_ROOT%\video_overview.webp"

echo.
echo ===================================================
echo   RECURSOS LISTOS EN LA CARPETA 'PRESENTACION_SCANIA'
echo ===================================================
pause
