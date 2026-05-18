// Servidor HTTP simple para el puente de escáner móvil
// Puerto 3001 - HTTP (sin SSL, compatible con todos los móviles)
// El móvil se conecta a http://192.168.100.90:3001/scan

const http = require('http')
const path = require('path')
const fs = require('fs')

// Ruta a la librería html5-qrcode local (no necesita internet)
// Ruta portable para la librería html5-qrcode
const HTML5QRCODE_PATH = [
  path.join(__dirname, 'node_modules', 'html5-qrcode', 'html5-qrcode.min.js'),
  path.join(__dirname, 'resources', 'standalone', 'control-acceso', 'public', 'js', 'html5-qrcode.min.js'),
  path.join(process.resourcesPath || '', 'standalone', 'control-acceso', 'public', 'js', 'html5-qrcode.min.js'),
  path.join(__dirname, 'html5-qrcode.min.js')
].find(p => fs.existsSync(p)) || path.join(__dirname, 'html5-qrcode.min.js')


let lastScan = null

const server = http.createServer((req, res) => {
  // CORS - permitir cualquier origen en la red local
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.writeHead(200)
    res.end()
    return
  }

  const url = req.url.split('?')[0]

  // =========================================================
  // GET /lib/html5-qrcode.min.js - Sirve la librería localmente (offline)
  // =========================================================
  if (req.method === 'GET' && url === '/lib/html5-qrcode.min.js') {
    try {
      const content = fs.readFileSync(HTML5QRCODE_PATH)
      res.writeHead(200, { 'Content-Type': 'application/javascript', 'Cache-Control': 'public, max-age=86400' })
      res.end(content)
    } catch (e) {
      res.writeHead(404)
      res.end('Librería no encontrada')
    }
    return
  }

  // =========================================================
  // GET /ping - Diagnóstico de conexión
  // =========================================================
  if (req.method === 'GET' && url === '/ping') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ ok: true, server: 'Puente Scania v4', time: new Date().toISOString() }))
    return
  }

  // =========================================================
  // POST /scan - Recibe dato del móvil y lo almacena
  // =========================================================
  if (req.method === 'POST' && url === '/scan') {
    let body = ''
    req.on('data', chunk => { body += chunk.toString() })
    req.on('end', () => {
      try {
        const data = JSON.parse(body)
        lastScan = { ...data, timestamp: Date.now() }
        console.log('📡 [PUENTE HTTP] Recibido desde celular:', lastScan.data || lastScan.rut)
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ success: true }))
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ error: 'JSON inválido' }))
      }
    })
    return
  }

  // =========================================================
  // GET /scan - PC lee el último escaneo
  // =========================================================
  if (req.method === 'GET' && url === '/scan') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(lastScan))
    return
  }

  // =========================================================
  // DELETE /scan - PC limpia después de leer
  // =========================================================
  if (req.method === 'DELETE' && url === '/scan') {
    lastScan = null
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ success: true }))
    return
  }

  // =========================================================
  // GET / - Página completa de escaneo para el móvil (HTTP puro)
  // =========================================================
  if (req.method === 'GET' && (url === '/' || url === '/test' || url === '/movil')) {
    const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
  <title>Scanner Scania</title>
  <script src="/lib/html5-qrcode.min.js" onload="console.log('Library loaded'); window.libLoaded = true;" onerror="console.error('Library failed'); window.libFailed = true;"></script>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0d1f3a; color: white; min-height: 100vh; display: flex; flex-direction: column; }
    .header { padding: 30px 20px 20px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.05); }
    .icon { width: 64px; height: 64px; background: #00A9E0; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px; font-size: 28px; }
    h1 { font-size: 20px; font-weight: 800; letter-spacing: -0.5px; }
    .sub { color: #94a3b8; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin-top: 4px; }
    .content { flex: 1; padding: 24px 20px; max-width: 400px; margin: 0 auto; width: 100%; display: flex; flex-direction: column; gap: 16px; }
    .btn { width: 100%; padding: 20px; border: none; border-radius: 20px; font-size: 16px; font-weight: 800; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 8px; transition: transform 0.1s; position: relative; overflow: hidden; }
    .btn:active { transform: scale(0.97); }
    .btn-photo { background: linear-gradient(135deg, rgba(0,169,224,0.15), transparent); border: 2px solid rgba(0,169,224,0.5); color: white; }
    .btn-photo .icon-sm { font-size: 36px; }
    .btn-manual { background: #1e2d45; border: 2px solid #334155; color: white; }
    .divider { display: flex; align-items: center; gap: 12px; }
    .divider-line { flex: 1; height: 1px; background: rgba(255,255,255,0.08); }
    .divider-text { color: #00A9E0; font-size: 10px; font-weight: 900; letter-spacing: 3px; }
    .input-rut { width: 100%; background: rgba(0,0,0,0.3); border: 2px solid #334155; border-radius: 16px; padding: 20px; font-size: 24px; font-weight: 800; text-align: center; color: white; outline: none; }
    .input-rut:focus { border-color: #00A9E0; }
    .btn-send { background: #00A9E0; color: white; border: none; border-radius: 16px; padding: 18px; font-size: 16px; font-weight: 800; width: 100%; cursor: pointer; }
    .btn-send:disabled { background: #334155; color: #64748b; cursor: not-allowed; }
    .btn-test { background: transparent; border: 1px solid #334155; color: #64748b; border-radius: 12px; padding: 12px; font-size: 12px; width: 100%; cursor: pointer; }
    .overlay { display: none; position: fixed; inset: 0; background: rgba(13,31,58,0.97); z-index: 100; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 20px; }
    .overlay.show { display: flex; }
    .spinner { width: 80px; height: 80px; border: 4px solid rgba(255,255,255,0.1); border-top-color: #00A9E0; border-radius: 50%; animation: spin 0.8s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .ok-circle { width: 80px; height: 80px; background: #22c55e; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 40px; animation: bounce 0.5s ease; }
    .err-circle { width: 80px; height: 80px; background: rgba(239,68,68,0.2); border: 2px solid #ef4444; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 40px; }
    @keyframes bounce { 0%,100%{transform:scale(1)} 50%{transform:scale(1.1)} }
    .overlay-title { font-size: 24px; font-weight: 900; margin-top: 24px; }
    .overlay-sub { color: #94a3b8; margin-top: 8px; font-size: 14px; max-width: 280px; }
    .btn-close { margin-top: 24px; background: rgba(255,255,255,0.1); border: none; color: white; padding: 14px 40px; border-radius: 14px; font-size: 14px; font-weight: 700; cursor: pointer; }
    .log { background: rgba(0,0,0,0.4); border-radius: 10px; padding: 10px; font-size: 10px; font-family: monospace; color: #4ade80; max-height: 120px; overflow-y: auto; display: none; }
    .log.show { display: block; }
    .log-toggle { font-size: 10px; color: #475569; text-align: center; cursor: pointer; text-decoration: underline; }
    .btn-video { background: linear-gradient(135deg, #00A9E0, #0076a3); color: white; border: none; margin-bottom: 8px; }
    .btn-video .icon-sm { font-size: 32px; }
    #video-container { display: none; width: 100%; border-radius: 20px; overflow: hidden; border: 2px solid #00A9E0; margin-bottom: 16px; position: relative; }
    #reader { width: 100%; }
    .btn-stop { position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); background: rgba(239,68,68,0.8); color: white; border: none; padding: 10px 20px; border-radius: 10px; font-weight: 700; }
  </style>
</head>
<body>
  <div class="header">
    <div class="icon">📱</div>
    <h1>PUENTE DE ACCESO</h1>
    <div class="sub">Scania — HTTP Local</div>
  </div>
  
  <div class="content">
    <!-- ESCANEAR CON VIDEO -->
    <div id="video-container">
      <div id="reader"></div>
      <button class="btn-stop" onclick="stopVideo()">DETENER CÁMARA</button>
    </div>

    <button class="btn btn-video" id="btnVideo" onclick="startVideo()">
      <span class="icon-sm">🎥</span>
      <span>ESCANEAR CON VIDEO</span>
      <small style="color:rgba(255,255,255,0.7);font-size:11px;font-weight:400">Escaneo en vivo (Recomendado)</small>
    </button>

    <!-- FOTO NATIVA -->
    <label class="btn btn-photo" for="photoInput">
      <span class="icon-sm">📷</span>
      <span>FOTO NATIVA</span>
      <small style="color:#94a3b8;font-size:11px;font-weight:400">Si el video falla, toma foto del REVERSO</small>
    </label>
    <input type="file" id="photoInput" accept="image/*" capture="environment">

    <div class="divider">
      <div class="divider-line"></div>
      <div class="divider-text">RESPALDO MANUAL</div>
      <div class="divider-line"></div>
    </div>

    <!-- INGRESO MANUAL -->
    <input type="text" id="rutInput" class="input-rut" placeholder="Ej: 12.345.678-9" inputmode="numeric">
    <button class="btn-send" id="btnSend" onclick="sendManual()" disabled>📡 ENVIAR AL PC</button>
    <button class="btn-test" onclick="testConexion()">🔌 Probar conexión</button>
    <span class="log-toggle" onclick="toggleLog()">Ver diagnóstico técnico</span>
    <div class="log" id="log"></div>
  </div>

  <!-- Overlay de estado -->
  <div class="overlay" id="overlay">
    <div id="overlayIcon"></div>
    <div class="overlay-title" id="overlayTitle"></div>
    <div class="overlay-sub" id="overlaySub"></div>
    <button class="btn-close" onclick="closeOverlay()">CERRAR</button>
  </div>

  <script>
    const rutInput = document.getElementById('rutInput')
    const btnSend = document.getElementById('btnSend')
    const overlay = document.getElementById('overlay')
    const log = document.getElementById('log')

    rutInput.addEventListener('input', () => {
      btnSend.disabled = rutInput.value.trim().length < 3
    })

    function addLog(msg) {
      const t = new Date().toLocaleTimeString()
      log.innerHTML = '<div>[' + t + '] ' + msg + '</div>' + log.innerHTML
    }

    function toggleLog() { log.classList.toggle('show') }

    function showOverlay(type, title, sub) {
      const icons = { sending: '<div class="spinner"></div>', ok: '<div class="ok-circle">✓</div>', err: '<div class="err-circle">✗</div>' }
      document.getElementById('overlayIcon').innerHTML = icons[type] || ''
      document.getElementById('overlayTitle').textContent = title
      document.getElementById('overlaySub').textContent = sub
      overlay.classList.add('show')
      if (type === 'ok') setTimeout(closeOverlay, 3000)
    }

    function closeOverlay() { overlay.classList.remove('show') }

    async function sendToPC(data) {
      if (!data || !data.trim()) { addLog('❌ Datos vacíos'); return }
      addLog('📤 Enviando: ' + data.substring(0, 50))
      showOverlay('sending', 'Enviando al PC...', 'Espere un momento')
      try {
        const res = await fetch('/scan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: data.trim() })
        })
        addLog('📬 HTTP: ' + res.status)
        if (res.ok) {
          addLog('✅ Enviado correctamente')
          showOverlay('ok', '¡RECIBIDO EN PC!', 'El RUT ya está en la pantalla del computador.')
          rutInput.value = ''
          btnSend.disabled = true
        } else {
          throw new Error('HTTP ' + res.status)
        }
      } catch(e) {
        addLog('❌ Error: ' + e.message)
        showOverlay('err', 'Sin conexión', 'Error: ' + e.message + '\\nVerifica que estés en la misma red Wi-Fi.')
      }
    }

    function sendManual() { sendToPC(rutInput.value) }

    async function testConexion() {
      addLog('🔌 Probando...')
      try {
        const r = await fetch('/ping')
        const j = await r.json()
        addLog('✅ OK: ' + JSON.stringify(j))
        alert('✅ Conexión perfecta!\\nServidor: ' + j.server)
      } catch(e) {
        addLog('❌ ' + e.message)
        alert('❌ Sin conexión\\n' + e.message)
      }
    }

    let html5QrScanner = null;

    async function startVideo() {
      if (typeof Html5Qrcode === 'undefined') {
        alert('Cargando motor de cámara... espera 1 segundo.'); return;
      }
      document.getElementById('video-container').style.display = 'block';
      document.getElementById('btnVideo').style.display = 'none';
      addLog('🎥 Iniciando cámara en vivo...');
      
      html5QrScanner = new Html5Qrcode("reader");
      try {
        await html5QrScanner.start(
          { facingMode: "environment" }, 
          { fps: 10, qrbox: { width: 280, height: 150 } },
          (decodedText) => {
            addLog('🎯 VIDEO: ' + decodedText.substring(0, 40));
            stopVideo();
            sendToPC(decodedText);
          },
          () => {}
        );
      } catch (err) {
        addLog('❌ Error cámara: ' + err.message);
        alert('No se pudo abrir la cámara. Asegúrate de estar en http://192.168.100.90:3001 y tener activado el flag chrome://flags/#unsafely-treat-insecure-origin-as-secure');
        stopVideo();
      }
    }

    function stopVideo() {
      document.getElementById('video-container').style.display = 'none';
      document.getElementById('btnVideo').style.display = 'flex';
      if (html5QrScanner) {
        html5QrScanner.stop().catch(() => {});
        html5QrScanner = null;
      }
    }

    // FOTO NATIVA - procesamiento optimizado para PDF417
    document.getElementById('photoInput').addEventListener('change', async function(e) {
      const file = e.target.files[0]
      if (!file) return
      this.value = ''
      addLog('📸 Foto: ' + Math.round(file.size/1024) + ' KB')
      showOverlay('sending', 'Analizando foto...', 'Buscando código PDF417')

      try {
        if (typeof Html5Qrcode !== 'undefined') {
          let dummy = document.getElementById('qr-dummy');
          if (!dummy) {
            dummy = document.createElement('div');
            dummy.id = 'qr-dummy';
            dummy.style.display = 'none';
            document.body.appendChild(dummy);
          }
          
          const scanner = new Html5Qrcode('qr-dummy');
          // Forzar búsqueda de PDF417 (carnet chileno)
          const config = { formatsToSupport: [ 6 ] }; // 6 = PDF_417
          
          addLog('🔍 Escaneando PDF417...');
          const decoded = await scanner.scanFile(file, false);
          
          addLog('🎯 Detectado: ' + decoded.substring(0, 40));
          closeOverlay();
          await sendToPC(decoded);
        } else {
          throw new Error('Librería no cargada');
        }
      } catch(err) {
        addLog('❌ Falló lectura: carnet borroso o mal iluminado');
        closeOverlay();
        const rut = prompt('No se detectó el código automáticamente.\\n\\nPrueba con el botón ESCANEAR CON VIDEO o ingresa el RUT manual aquí:');
        if (rut) await sendToPC(rut);
      }
    })

    // Cargar Html5Qrcode desde este mismo servidor (offline, sin internet)
    addLog('🚀 Página cargada — HTTP local OK')
  </script>
</body>
</html>`
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
    res.end(html)
    return
  }

  res.writeHead(404)
  res.end('Not found')
})

const PORT = 3001
server.listen(PORT, '0.0.0.0', () => {
  console.log(`\n🌐 ===================================`)
  console.log(`🌐 PUENTE HTTP iniciado`)
  console.log(`🌐 URL para celular: http://192.168.100.90:${PORT}/test`)
  console.log(`🌐 API del puente:   http://192.168.100.90:${PORT}/scan`)
  console.log(`🌐 ===================================\n`)
})

server.on('error', (err) => {
  console.error('❌ Error en servidor puente:', err.message)
})
