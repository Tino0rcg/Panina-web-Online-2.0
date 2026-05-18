'use client'
import { useState, useRef } from 'react'
import { Smartphone, Camera, CheckCircle, AlertCircle, Send, Wifi, WifiOff } from 'lucide-react'

export default function MobileScanPage() {
  const [rutInput, setRutInput] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [showCamera, setShowCamera] = useState(false)
  const [debugLog, setDebugLog] = useState<string[]>([])
  const [showDebug, setShowDebug] = useState(false)
  const scannerRef = useRef<any>(null)

  function addLog(msg: string) {
    const ts = new Date().toLocaleTimeString('es-CL')
    setDebugLog(prev => [`[${ts}] ${msg}`, ...prev].slice(0, 20))
  }

  async function sendToPC(data: string) {
    if (!data || !data.trim()) {
      addLog('❌ Datos vacíos, no se envía nada')
      return
    }
    const trimmed = data.trim()
    addLog(`📤 Enviando: ${trimmed.substring(0, 50)}`)
    setStatus('sending')
    try {
      // Usar puente HTTP en puerto 3001 (sin SSL, funciona en todos los móviles sin configuración)
      const bridgeUrl = `http://192.168.100.90:3001/scan`
      addLog(`🌐 POST → ${bridgeUrl}`)
      const res = await fetch(bridgeUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: trimmed })
      })
      addLog(`📬 HTTP: ${res.status}`)
      if (res.ok) {
        addLog('✅ Enviado correctamente al PC')
        setStatus('success')
        setRutInput('')
        setTimeout(() => setStatus('idle'), 3000)
      } else {
        const txt = await res.text()
        addLog(`❌ Error: ${txt.substring(0, 60)}`)
        setStatus('error')
        setErrorMsg(`Error del servidor (${res.status})`)
        setTimeout(() => setStatus('idle'), 5000)
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      addLog(`🔥 Sin conexión: ${msg}`)
      setStatus('error')
      setErrorMsg(`Sin conexión al PC. Verifica Wi-Fi.`)
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  function startCamera() {
    setShowCamera(true)
    addLog('📷 Iniciando cámara...')
    setTimeout(async () => {
      try {
        const { Html5Qrcode } = await import('html5-qrcode')
        addLog('✅ Librería Html5Qrcode cargada')
        const html5QrCode = new Html5Qrcode('reader')
        scannerRef.current = html5QrCode

        html5QrCode.start(
          { facingMode: 'environment' },
          { fps: 10, qrbox: { width: 300, height: 150 } },
          (decodedText: string) => {
            addLog(`🎯 Código detectado por video: ${decodedText.substring(0, 60)}`)
            if (scannerRef.current) {
              scannerRef.current.stop().then(() => {
                scannerRef.current = null
                setShowCamera(false)
                sendToPC(decodedText)
              }).catch(() => {
                setShowCamera(false)
                sendToPC(decodedText)
              })
            }
          },
          () => {}
        ).catch((err: unknown) => {
          const msg = err instanceof Error ? err.message : String(err)
          addLog(`❌ Error cámara: ${msg}`)
          alert('Error al iniciar cámara. Da permiso de cámara al navegador.')
          setShowCamera(false)
        })
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err)
        addLog(`❌ Error importando librería: ${msg}`)
        setShowCamera(false)
      }
    }, 500)
  }

  function stopCamera() {
    if (scannerRef.current) {
      scannerRef.current.stop().then(() => {
        scannerRef.current = null
        setShowCamera(false)
        addLog('🛑 Cámara detenida por usuario')
      }).catch(() => {
        scannerRef.current = null
        setShowCamera(false)
      })
    } else {
      setShowCamera(false)
    }
  }

  const handlePhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    e.target.value = ''
    addLog(`📸 Foto recibida: ${file.name} (${(file.size / 1024).toFixed(0)} KB)`)

    setStatus('sending')
    try {
      const { Html5Qrcode } = await import('html5-qrcode')
      addLog('🔍 Procesando imagen con Html5Qrcode...')
      let dummy = document.getElementById('qr-dummy')
      if (!dummy) {
        dummy = document.createElement('div')
        dummy.id = 'qr-dummy'
        dummy.style.display = 'none'
        document.body.appendChild(dummy)
      }
      const scanner = new Html5Qrcode('qr-dummy')
      const decoded = await scanner.scanFile(file, false)
      addLog(`🎯 Código detectado en foto: ${decoded.substring(0, 60)}`)
      await sendToPC(decoded)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      addLog(`❌ No se detectó código en foto: ${msg.substring(0, 80)}`)
      setStatus('error')
      setErrorMsg('No se detectó código. Apunta al REVERSO del carnet (código de barras negro).')
      setTimeout(() => setStatus('idle'), 6000)
    }
  }

  return (
    <div className="min-h-screen bg-[#0d1f3a] text-white flex flex-col font-sans">
      {/* Header */}
      <div className="p-6 pt-10 text-center space-y-2 border-b border-white/5 bg-[#0d1f3a]/80 backdrop-blur-xl sticky top-0 z-10">
        <div className="w-16 h-16 bg-[#00A9E0] rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-[#00A9E0]/20 mb-2">
          <Smartphone className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-xl font-bold tracking-tight">PUENTE DE ACCESO</h1>
        <p className="text-slate-400 text-xs uppercase tracking-widest font-medium">Conexión Local Scania</p>
        <button
          onClick={() => setShowDebug(d => !d)}
          className="text-[10px] text-slate-600 underline mt-1"
        >
          {showDebug ? 'Ocultar' : 'Ver'} diagnóstico
        </button>
      </div>

      {/* Debug Log */}
      {showDebug && (
        <div className="mx-4 mt-4 bg-black/50 rounded-xl p-3 text-[10px] font-mono text-green-400 max-h-40 overflow-y-auto">
          {debugLog.length === 0 ? <p className="text-slate-600">Sin actividad aún...</p> : debugLog.map((l, i) => <p key={i}>{l}</p>)}
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 p-6 flex flex-col justify-center max-w-sm mx-auto w-full space-y-6">

        {/* Botones de escaneo */}
        <div className="space-y-4">
          <button
            onClick={startCamera}
            className="flex flex-col items-center justify-center gap-3 w-full py-6 bg-gradient-to-b from-[#00A9E0]/20 to-transparent border-2 border-[#00A9E0]/40 rounded-3xl hover:bg-[#00A9E0]/30 transition active:scale-95 shadow-lg"
          >
            <div className="p-4 bg-[#00A9E0] rounded-full shadow-lg shadow-[#00A9E0]/50">
              <Camera className="w-8 h-8 text-white" />
            </div>
            <div className="text-center">
              <span className="block text-lg font-black tracking-tight text-white mb-1">ESCANEAR CON VIDEO</span>
              <span className="text-xs text-slate-300 font-medium">Apunta al reverso del carnet</span>
            </div>
          </button>

          <label className="flex flex-col items-center justify-center gap-3 w-full py-6 bg-slate-800/50 border-2 border-slate-700 rounded-3xl hover:bg-slate-800 transition cursor-pointer active:scale-95 shadow-lg">
            <div className="p-3 bg-slate-700 rounded-full">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <div className="text-center">
              <span className="block text-base font-bold text-white mb-1">FOTO NATIVA</span>
              <span className="text-xs text-slate-400">Toma foto del REVERSO del carnet</span>
            </div>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={handlePhoto}
            />
          </label>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
          <div className="relative flex justify-center text-xs uppercase text-[#00A9E0] font-black tracking-widest bg-[#0d1f3a] px-4">RESPALDO MANUAL</div>
        </div>

        {/* Manual Input */}
        <div className="w-full space-y-3">
          <input
            type="text"
            value={rutInput}
            onChange={(e) => setRutInput(e.target.value)}
            placeholder="Ej: 12.345.678-9"
            className="w-full bg-black/30 border border-slate-700 rounded-2xl px-6 py-5 text-xl font-bold text-center focus:outline-none focus:border-[#00A9E0] transition"
          />
          <button
            disabled={!rutInput || status !== 'idle'}
            onClick={() => sendToPC(rutInput)}
            className="w-full py-4 bg-[#00A9E0] disabled:opacity-40 disabled:bg-slate-700 text-white rounded-2xl font-bold flex items-center justify-center gap-3 active:scale-95 transition"
          >
            <Send className="w-5 h-5" />
            ENVIAR AL PC
          </button>
          <button
            onClick={async () => {
              addLog('🔌 Probando puente HTTP (puerto 3001)...')
              try {
                const r = await fetch('http://192.168.100.90:3001/ping')
                const j = await r.json()
                addLog(`✅ Servidor responde: HTTP ${r.status}`)
                alert(`✅ Conexión OK!\n${JSON.stringify(j)}`)
              } catch (e: unknown) {
                const msg = e instanceof Error ? e.message : String(e)
                addLog(`❌ Servidor NO responde: ${msg}`)
                alert(`❌ Sin conexión al puente HTTP.\nError: ${msg}\n\nVerifica que el bridge-server.js esté corriendo.`)
              }
            }}
            className="w-full py-3 bg-slate-800 text-slate-400 rounded-2xl font-medium border border-slate-700 flex items-center justify-center gap-2 active:scale-95 transition text-sm"
          >
            <Wifi className="w-4 h-4" />
            PROBAR CONEXIÓN
          </button>
        </div>
      </div>

      {/* Video Overlay */}
      {showCamera && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#111e35] rounded-3xl p-6 border border-[#00A9E0]/30 shadow-2xl">
            <h2 className="text-white text-center font-bold mb-2 text-xl">Reverso del carnet</h2>
            <p className="text-slate-400 text-center text-xs mb-4">Apunta al código de barras negro (PDF417)</p>
            <div id="reader" className="w-full rounded-2xl overflow-hidden border-2 border-[#00A9E0]"></div>
            <button
              onClick={stopCamera}
              className="mt-6 w-full py-4 bg-red-500/20 text-red-400 rounded-xl font-bold border border-red-500/50 active:scale-95 transition"
            >
              CANCELAR ESCANEO
            </button>
          </div>
        </div>
      )}

      {/* Status Overlay */}
      {status !== 'idle' && (
        <div className="fixed inset-0 bg-[#0d1f3a]/95 z-[150] flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300">
          {status === 'sending' && (
            <>
              <div className="relative">
                <div className="w-24 h-24 border-4 border-t-[#00A9E0] border-white/10 rounded-full animate-spin"></div>
                <Send className="absolute inset-0 m-auto w-8 h-8 text-[#00A9E0] animate-pulse" />
              </div>
              <p className="mt-8 text-xl font-bold">Enviando al PC...</p>
            </>
          )}
          {status === 'success' && (
            <>
              <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center animate-bounce shadow-lg shadow-green-500/20">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <p className="mt-8 text-2xl font-black text-green-400">¡RECIBIDO EN PC!</p>
              <p className="text-slate-400 mt-2 text-center px-10">El RUT ya está en la pantalla del computador.</p>
            </>
          )}
          {status === 'error' && (
            <>
              <div className="w-24 h-24 bg-red-500/20 border-2 border-red-500 rounded-full flex items-center justify-center">
                <WifiOff className="w-12 h-12 text-red-500" />
              </div>
              <p className="mt-8 text-lg font-bold text-red-400 text-center px-10">{errorMsg}</p>
              <button
                onClick={() => { setStatus('idle'); setShowDebug(true) }}
                className="mt-8 px-10 py-4 bg-white/10 rounded-2xl font-bold active:scale-95"
              >
                VER DIAGNÓSTICO
              </button>
            </>
          )}
        </div>
      )}

      <div className="p-8 text-center opacity-20">
        <p className="text-[10px] font-bold tracking-widest text-[#00A9E0]">SCANIA ACCESS BRIDGE v4.0</p>
      </div>
    </div>
  )
}
