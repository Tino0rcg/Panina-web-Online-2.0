'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

// El puente HTTP corre en puerto 3001 (sin SSL, compatible con todos los móviles)
// Se usa window.location.hostname para que funcione tanto en localhost como en la IP de la red
const getBridgeUrl = () => {
  if (typeof window !== 'undefined') {
    return `http://${window.location.hostname}:3001/scan`;
  }
  return '';
};

export default function RemoteScanListener() {
  const router = useRouter()

  useEffect(() => {
    let isChecking = false
    const interval = setInterval(async () => {
      if (isChecking) return
      isChecking = true

      try {
        // Intentar primero el puente HTTP (móvil sin SSL) en puerto 3001
        let data: any = null

        try {
          const url = getBridgeUrl();
          if (!url) return;

          const resBridge = await fetch(url + '?t=' + Date.now(), { cache: 'no-store' })
          if (resBridge.ok) {
            const bridgeData = await resBridge.json()
            if (bridgeData && bridgeData.data) {
              data = bridgeData
              // Limpiar el puente HTTP
              await fetch(url, { method: 'DELETE' })
            }
          }
        } catch {
          // Puente HTTP no disponible, intentar API HTTPS local
        }

        // Si no llegó nada por puente HTTP, revisar API HTTPS interna
        if (!data) {
          const resHttps = await fetch('/api/remote-scan?t=' + Date.now(), { cache: 'no-store' })
          if (resHttps.ok) {
            const httpsData = await resHttps.json()
            if (httpsData && httpsData.data) {
              data = httpsData
              await fetch('/api/remote-scan', { method: 'DELETE' })
            }
          }
        }

        if (data) {
          console.log('📡 [LIVE] Escaneo recibido:', data.data)
          router.push(`/dashboard/registro?scan=${encodeURIComponent(data.data)}&t=${Date.now()}`)
        }
      } catch {
        // Silencioso - errores de red son normales
      } finally {
        isChecking = false
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [router])

  return null
}
