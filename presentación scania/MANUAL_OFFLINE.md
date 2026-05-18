# 📘 Manual Técnico: Sistema Control de Acceso Offline (Scania)

Este sistema ha sido transformado para funcionar de forma **100% autónoma en computadores sin internet**. Utiliza una arquitectura de servidor local embebido.

---

## 🏗️ Estructura del Proyecto

1.  **`control-acceso/`**: El "cerebro" del sistema (Frontend y API).
    *   **Base de Datos**: `prisma/dev.db` (Aquí se guardan todos los datos).
    *   **Tecnología**: Next.js + Prisma + SQLite.
2.  **`control-acceso-desktop/`**: El contenedor de escritorio (Electron).
    *   **`main.js`**: Se encarga de iniciar el servidor web y poner la pantalla en Modo Kiosko.
    *   **`dist/`**: Carpeta donde se generará el instalador `.exe`.

---

## 🚀 Cómo generar el Instalador (.exe)

Cada vez que realices cambios en el código (colores, textos, funciones) y quieras llevarlos a otro PC, debes:

1.  Abre una terminal en `control-acceso-desktop`.
2.  Ejecuta: `npm run build`
3.  Busca el archivo generado en la carpeta `dist/`. Tendrá un nombre como `Control-Acceso-Setup.exe`.

---

## 🔑 Acceso Inicial (Cero Internet)

Al instalar el sistema en un PC nuevo, usa estas credenciales maestras:
*   **Usuario**: `admin@online.cl`
*   **Contraseña**: `admin`

---

## 💾 Gestión de Datos (Backup)

Como no hay internet, los datos **NO se sincronizan con la nube**. 
*   Para respaldar la información, copia el archivo `control-acceso/prisma/dev.db`.
*   Si quieres mover los datos de un PC a otro, simplemente reemplaza ese archivo en el nuevo PC.

---

## 🛠️ Solución de Problemas

*   **Pantalla en blanco al iniciar**: El servidor local tarda unos segundos en arrancar. Si no carga, cierra con `Ctrl+Shift+Q` y vuelve a abrir.
*   **Salir del Modo Kiosko**: Presiona siempre **`Ctrl + Shift + Q`**.
*   **Lector de Cédula**: Asegúrate de que el cursor esté enfocado en el campo de escaneo. El sistema está optimizado para lectores Zebra y Honeywell en modo emulación de teclado.

---
© 2025 ONLINE System · Versión Offline v1.0 personalizada para Scania.
