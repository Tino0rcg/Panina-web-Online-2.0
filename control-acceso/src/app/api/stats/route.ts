import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const company_id = searchParams.get('company_id')

  try {
    const days = 7
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    const where: any = {
      entry_time: { gte: startDate }
    }
    if (company_id) where.company_id = company_id

    const allVisits = await prisma.visit.findMany({
      where: {
        ...(company_id ? { company_id } : {}),
        entry_time: { gte: startDate },
        is_active: true
      },
      orderBy: { entry_time: 'desc' }
    })

    const total = allVisits.length
    const active = allVisits.filter(v => !v.exit_time).length
    
    // Excluir importaciones para el promedio diario y duración para no sesgar la estadística real
    const realVisits = allVisits.filter(v => v.reason !== 'Importación de datos históricos')
    
    // Promedio diario basado en días con actividad real o al menos 1
    const daysWithRealData = new Set(realVisits.map(v => v.entry_time.toISOString().split('T')[0])).size || 1
    const avgDaily = Math.round(realVisits.length / daysWithRealData)

    // Cálculo de duración promedio (solo visitas finalizadas y no importadas)
    const finishedVisits = realVisits.filter(v => v.exit_time)
    let avgDuration = 0
    if (finishedVisits.length > 0) {
      const validDurations = finishedVisits.map(v => {
        return (new Date(v.exit_time!).getTime() - new Date(v.entry_time).getTime()) / 60000;
      }).filter(mins => mins > 0 && mins < 840); // Excluir visitas > 14 horas

      if (validDurations.length > 0) {
        const totalDuration = validDurations.reduce((acc, val) => acc + val, 0);
        avgDuration = Math.round(totalDuration / validDurations.length);
      }
    }

    // Chart data (Incluye todos para ver el volumen total)
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date()
      d.setDate(d.getDate() - (6 - i))
      return {
        day: d.toLocaleDateString('es-CL', { weekday: 'short' }),
        dateStr: d.toISOString().split('T')[0],
        count: 0
      }
    })

    allVisits.forEach(v => {
      const vDate = v.entry_time.toISOString().split('T')[0]
      const daySlot = last7Days.find(d => d.dateStr === vDate)
      if (daySlot) daySlot.count++
    })

    return NextResponse.json({
      stats: { total, avgDaily, active, avgDuration: avgDuration || 0 },
      chartData: last7Days
    })
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener estadísticas' }, { status: 500 })
  }
}
