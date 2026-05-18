@echo off
TITLE Corrector de Visitas SCANIA
color 0b
echo ===================================================
echo     HERRAMIENTA DE CORRECCION DE VISITAS (SIN CORS)
echo ===================================================
echo.
echo Ejecutando parche...
echo.

powershell -ExecutionPolicy Bypass -Command "$ErrorActionPreference = 'Stop'; $urls = @('http://localhost:3000', 'http://192.168.100.20:3000'); $success = $false; foreach ($baseUrl in $urls) { try { Write-Host \"Probando conexion con $baseUrl ...\" -ForegroundColor Cyan; $res = Invoke-RestMethod -Uri \"$baseUrl/api/visits?limit=10000\" -Method Get -TimeoutSec 5; $pendientes = $res.visits | Where-Object { $null -eq $_.exit_time }; $count = 0; if ($pendientes -is [array]) { $count = $pendientes.Count } elseif ($null -ne $pendientes) { $count = 1; $pendientes = @($pendientes) }; if ($count -eq 0) { Write-Host \"Conexion exitosa con $baseUrl. No hay visitas pendientes atoradas. Todo perfecto.\" -ForegroundColor Green } else { Write-Host \"Se detectaron $count visitas atoradas en $baseUrl.\" -ForegroundColor Yellow; foreach ($v in $pendientes) { Write-Host \"-> Cerrando visita RUT: $($v.person.rut)...\"; $body = @{ visit_id = $v.id } | ConvertTo-Json; Invoke-RestMethod -Uri \"$baseUrl/api/visits/exit\" -Method Post -Body $body -ContentType 'application/json' | Out-Null; Write-Host \"   Visita cerrada correctamente.\" -ForegroundColor Green } }; $success = $true; break } catch { Write-Host \"No se pudo conectar a $baseUrl\" -ForegroundColor DarkGray } }; if (-not $success) { Write-Host \"ERROR: No se pudo conectar al sistema. Asegurate de que el programa Scania este abierto en la pantalla.\" -ForegroundColor Red }"

echo.
echo ===================================================
echo   PROCESO FINALIZADO
echo ===================================================
pause
