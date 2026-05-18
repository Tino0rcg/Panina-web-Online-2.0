const { app, BrowserWindow, globalShortcut, Menu } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const os = require('os');
const fs = require('fs');

let nextProcess;
let bridgeProcess;

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

function createWindow() {
  const { screen } = require('electron');
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  // Calcular zoom óptimo basado en la resolución de pantalla
  let zoomFactor = 1.0;
  if (height <= 768) {
    zoomFactor = 0.80; // Notebooks pequeñas (1366x768)
  } else if (height <= 900) {
    zoomFactor = 0.88; // Pantallas 1600x900
  } else if (height <= 1080) {
    zoomFactor = 0.92; // Full HD 1920x1080
  }

  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    fullscreen: true,
    kiosk: true,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
    icon: path.join(__dirname, 'icon.ico')
  });

  // Ocultar barra de menú superior para un acabado profesional
  mainWindow.setMenu(null);
  Menu.setApplicationMenu(null);

  const localIP = getLocalIP();
  console.log(`[PC] IP Local Detectada: ${localIP} | Resolución: ${width}x${height} | Zoom: ${zoomFactor}`);

  // Aplicar zoom automático cuando la página cargue
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.setZoomFactor(zoomFactor);
  });

  const loadURL = () => {
    mainWindow.loadURL('http://localhost:3000').catch(() => {
      setTimeout(loadURL, 1000);
    });
  };

  loadURL();

  globalShortcut.register('CommandOrControl+Shift+Q', () => {
    app.quit();
  });
}

function startServers() {
  // Helper para obtener la ruta de recursos
  const getResourcePath = () => {
    return app.isPackaged 
      ? process.resourcesPath 
      : path.join(__dirname, 'resources');
  };

  const resourcesPath = getResourcePath();
  const userDataPath = app.getPath('userData');
  const dbPath = path.join(userDataPath, 'dev.db');
  
  // Archivo de log para debuggear en producción
  const logFilePath = path.join(userDataPath, 'scania-system.log');
  const logFile = fs.createWriteStream(logFilePath, { flags: 'a' });
  const log = (msg) => {
    const line = `[${new Date().toISOString()}] ${msg}\n`;
    console.log(line.trim());
    logFile.write(line);
  };

  log('=== INICIANDO SERVIDORES SCANIA ===');
  log(`Ruta de recursos: ${resourcesPath}`);

  // Copiar DB inicial si no existe
  const sourceDbPath = path.join(resourcesPath, 'dev.db');
  if (!fs.existsSync(dbPath) && fs.existsSync(sourceDbPath)) {
    fs.copyFileSync(sourceDbPath, dbPath);
    log(`[PC] Base de datos inicial instalada en: ${dbPath}`);
  }

  const env = {
    ...process.env,
    DATABASE_URL: `file:${dbPath}`,
    PORT: '3000',
    NODE_ENV: 'production',
    ELECTRON_RUN_AS_NODE: '1' // Usar el Node interno de Electron
  };

  // 1. Iniciar Next.js (Standalone)
  const nextServerPath = path.join(resourcesPath, 'standalone', 'control-acceso', 'server.js');
  const nextServerDir = path.dirname(nextServerPath);
  if (fs.existsSync(nextServerPath)) {
    log(`Iniciando NextJS desde: ${nextServerPath}`);
    nextProcess = spawn(process.execPath, [nextServerPath], { env, cwd: nextServerDir });
    
    nextProcess.stdout.on('data', (data) => log(`NextJS: ${data}`));
    nextProcess.stderr.on('data', (data) => log(`NextJS Error: ${data}`));
  } else {
    log(`[PC] ERROR: No se encontró server.js de NextJS en: ${nextServerPath}`);
  }

  // 2. Iniciar Bridge Server
  const bridgeServerPath = path.join(resourcesPath, 'bridge-server.js');
  const bridgeServerDir = path.dirname(bridgeServerPath);
  if (fs.existsSync(bridgeServerPath)) {
    log(`Iniciando Bridge desde: ${bridgeServerPath}`);
    bridgeProcess = spawn(process.execPath, [bridgeServerPath], { env, cwd: bridgeServerDir });
    
    bridgeProcess.stdout.on('data', (data) => log(`Bridge: ${data}`));
    bridgeProcess.stderr.on('data', (data) => log(`Bridge Error: ${data}`));
  } else {
    log(`[PC] ERROR: No se encontró bridge-server.js en: ${bridgeServerPath}`);
  }
}

app.whenReady().then(() => {
  startServers();
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (nextProcess) nextProcess.kill();
  if (bridgeProcess) bridgeProcess.kill();
  if (process.platform !== 'darwin') app.quit();
});
