import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// Memoria temporal para el puente (se limpia al reiniciar el servidor)
let lastScan: any = null

export async function POST(req: Request) {
  try {
    const data = await req.json()
    console.log('📡 [PUENTE] Recibido desde celular:', data.data || data.rut)
    lastScan = { ...data, timestamp: Date.now() }
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('❌ [PUENTE] Error al recibir:', error)
    return NextResponse.json({ error: 'Error en el puente' }, { status: 500 })
  }
}

export async function GET() {
  // console.log('👀 [PUENTE] PC consultando...')
  return NextResponse.json(lastScan)
}

export async function DELETE() {
  // Limpiar después de que el PC recoja los datos
  lastScan = null
  return NextResponse.json({ success: true })
}
