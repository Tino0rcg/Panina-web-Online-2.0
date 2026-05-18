import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const period = parseInt(searchParams.get('period') || '30')
  const company_id = searchParams.get('company_id')

  try {
    const since = new Date()
    since.setDate(since.getDate() - period)

    // Obtener sesión para filtrar por guardia si es necesario
    const cookieHeader = req.headers.get('cookie') || ''
    const sessionMatch = cookieHeader.match(/session=([^;]+)/)
    let callerId = null
    let callerRole = null
    if (sessionMatch) {
      const sessionData = JSON.parse(decodeURIComponent(sessionMatch[1]))
      callerId = sessionData.id
      callerRole = sessionData.role
    }

    const where: any = {
      entry_time: { gte: since },
      is_active: true,
      ...(company_id ? { company_id } : {})
    }

    // Si es guardia, solo ve sus propias gestiones
    if (callerRole === 'guard') {
      where.guard_id = callerId
    }

    const visits = await prisma.visit.findMany({
      where,
      include: {
        door: { select: { name: true } }
      },
      orderBy: { entry_time: 'asc' }
    })

    // Totales
    const total = visits.length
    const withExit = visits.filter(v => v.exit_time).length
    
    // Filtrar para estadísticas operativas
    const realVisits = visits.filter(v => v.reason !== 'Importación de datos históricos')
    
    const durations = realVisits
      .filter(v => v.exit_time && v.entry_time)
      .map(v => (new Date(v.exit_time!).getTime() - new Date(v.entry_time).getTime()) / 60000)
      // Filtro para excluir importaciones masivas o visitas que quedaron abiertas (mayor a 14 horas = 840 min)
      .filter(mins => mins > 0 && mins < 840)
    
    const avgDuration = durations.length > 0 
      ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length) 
      : 0

    const daysWithData = new Set(realVisits.map(v => v.entry_time.toISOString().split('T')[0])).size || 1
    const promDiario = Math.round(realVisits.length / daysWithData)

    // Por día (agregado)
    const dailyMap: Record<string, number> = {}
    visits.forEach(v => {
      const d = new Date(v.entry_time).toLocaleDateString('es-CL', { day: '2-digit', month: '2-digit' })
      dailyMap[d] = (dailyMap[d] || 0) + 1
    })
    const daily = Object.entries(dailyMap).map(([date, count]) => ({ date, count }))

    // Por área
    const areaMap: Record<string, number> = {}
    visits.forEach(v => {
      const area = v.area || 'No especificada'
      areaMap[area] = (areaMap[area] || 0) + 1
    })
    const byArea = Object.entries(areaMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([area, count]) => ({ area, count }))

    // Por puerta
    const doorMap: Record<string, number> = {}
    visits.forEach(v => {
      const name = v.door?.name || 'Sin puerta'
      doorMap[name] = (doorMap[name] || 0) + 1
    })
    const byDoor = Object.entries(doorMap)
      .sort((a, b) => b[1] - a[1])
      .map(([door, count]) => ({ door, count }))

    return NextResponse.json({
      totals: {
        total,
        conSalida: withExit,
        promDiario: promDiario,
        duracionProm: avgDuration
      },
      daily,
      byArea,
      byDoor,
      visits: visits.map(v => ({
        ...v,
        door_name: v.door?.name
      }))
    })
  } catch (error: any) {
    console.error('Error en reportes:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
