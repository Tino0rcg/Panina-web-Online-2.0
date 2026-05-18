@echo off
TITLE GENERANDO POWERPOINT SCANIA
color 0b

echo ===================================================
echo   GENERANDO ARCHIVO .PPTX PROFESIONAL
echo ===================================================
echo.

:: Verificar si existe Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] No se encontro Node.js instalado.
    echo Por favor, usa la PRESENTACION_INTERACTIVA_SCANIA.html 
    echo que no requiere ninguna instalacion.
    pause
    exit /b
)

echo [+] Instalando libreria temporal y generando PPT...
npx -y pptxgenjs GEN_PRESENTACION_SCANIA.cjs

echo.
if exist "PRESENTACION_SCANIA_SISTEMA.pptx" (
    echo ===================================================
    echo   EXITO: PRESENTACION_SCANIA_SISTEMA.pptx generado!
    echo ===================================================
) else (
    echo [!] Hubo un problema al generar el archivo. 
    echo Asegurate de haber corrido primero PREPARAR_RECURSOS_PRESENTACION.bat
)

pause
