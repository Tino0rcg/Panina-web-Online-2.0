'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { BarChart2, Download, TrendingUp, Users, Clock, DoorOpen } from 'lucide-react'
import * as XLSX from 'xlsx'

interface DailyStat { date: string; count: number }
interface AreaStat { area: string; count: number }
interface DoorStat { door: string; count: number }

export default function ReportesPage() {
  const [period, setPeriod] = useState<'7' | '30' | '90'>('30')
  const [daily, setDaily] = useState<DailyStat[]>([])
  const [byArea, setByArea] = useState<AreaStat[]>([])
  const [byDoor, setByDoor] = useState<DoorStat[]>([])
  const [totals, setTotals] = useState({ total: 0, conSalida: 0, promDiario: 0, duracionProm: 0 })
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => { loadData() }, [period])
  
  async function loadData() {
    setLoading(true)
    try {
      // 1. Obtener sesión
      const resMe = await fetch('/api/users/me')
      const userSession = await resMe.json()
      if (!userSession || userSession.error) {
        window.location.href = '/'
        return
      }

      // 2. Obtener datos de reportes desde la API local
      const companyParam = userSession.company_id ? `&company_id=${userSession.company_id}` : ''
      const res = await fetch(`/api/reports?period=${period}${companyParam}`)
      const data = await res.json()

      if (data.error) throw new Error(data.error)

      setTotals(data.totals)
      setDaily(data.daily)
      setByArea(data.byArea)
      setByDoor(data.byDoor)
    } catch (error) {
      console.error('Error cargando reportes:', error)
    } finally {
      setLoading(false)
    }
  }

  function exportXLSX() {
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(daily.map(d => ({ Fecha: d.date, Visitas: d.count }))), 'Por Día')
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(byArea.map(a => ({ Área: a.area, Visitas: a.count }))), 'Por Área')
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(byDoor.map(d => ({ Puerta: d.door, Visitas: d.count }))), 'Por Puerta')
    XLSX.writeFile(wb, `reporte_${period}dias_${new Date().toISOString().slice(0, 10)}.xlsx`)
  }

  const maxDaily = Math.max(...daily.map(d => d.count), 1)
  const maxArea = Math.max(...byArea.map(a => a.count), 1)

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Reportes</h1>
          <p className="text-slate-400 text-sm mt-1">Análisis de visitas por período</p>
        </div>
        <div className="flex gap-3">
          {/* Selector período */}
          <div className="flex bg-[#111e35] border border-[#00A9E0]/15 rounded-xl p-1">
            {([['7', 'Últimos 7 días'], ['30', 'Últimos 30 días'], ['90', 'Últimos 90 días']] as const).map(([v, label]) => (
              <button key={v} onClick={() => setPeriod(v)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${period === v ? 'bg-[#00A9E0] text-white' : 'text-slate-400 hover:text-white'}`}>
                {v === '7' ? '7d' : v === '30' ? '30d' : '90d'}
              </button>
            ))}
          </div>
          <button onClick={exportXLSX}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-xl text-sm font-semibold transition">
            <Download className="w-4 h-4" /> Excel
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: `Total visitas (${period} días)`, value: totals.total.toLocaleString('es-CL'), icon: Users, color: 'text-[#00A9E0]', bg: 'bg-[#00A9E0]/10' },
          { label: 'Promedio diario', value: totals.promDiario.toLocaleString('es-CL'), icon: TrendingUp, color: 'text-green-400', bg: 'bg-green-400/10' },
          { label: 'Con salida registrada', value: totals.conSalida.toLocaleString('es-CL'), icon: DoorOpen, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
          { label: 'Duración promedio', value: totals.duracionProm ? `${totals.duracionProm} min` : '—', icon: Clock, color: 'text-purple-400', bg: 'bg-purple-400/10' },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-[#111e35] border border-[#00A9E0]/15 rounded-2xl p-5">
            <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-3`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <p className="text-2xl font-bold text-white">{loading ? '...' : value}</p>
            <p className="text-slate-400 text-xs mt-1">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Gráfico visitas por día (Rediseñado para ser legible) */}
        <div className="bg-[#111e35] border border-[#00A9E0]/15 rounded-2xl p-6">
          <h2 className="text-white font-semibold mb-6 flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-[#00A9E0]" /> Visitas por día
          </h2>
          {loading ? (
            <div className="h-64 flex items-center justify-center text-slate-500">Cargando...</div>
          ) : (
            <div className="space-y-4 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
              {daily.slice().reverse().map(d => (
                <div key={d.date} className="group">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-bold text-slate-300 group-hover:text-[#00A9E0] transition-colors">
                      {d.date}
                    </span>
                    <span className="text-xs font-bold text-[#00A9E0] bg-[#00A9E0]/10 px-2 py-0.5 rounded-full">
                      {d.count} visitas
                    </span>
                  </div>
                  <div className="h-3 bg-slate-800/50 rounded-full overflow-hidden border border-slate-700/30">
                    <div 
                      className="h-full bg-gradient-to-r from-[#00A9E0] to-[#00d4ff] rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${(d.count / maxDaily) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
              {daily.length === 0 && (
                <div className="h-40 flex flex-col items-center justify-center text-slate-500">
                  <BarChart2 className="w-8 h-8 opacity-20 mb-2" />
                  <p className="text-sm italic">Sin datos para este período</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Por área */}
        <div className="bg-[#111e35] border border-[#00A9E0]/15 rounded-2xl p-6">
          <h2 className="text-white font-semibold mb-4">Visitas por área</h2>
          {loading ? <div className="h-48 flex items-center justify-center text-slate-500">Cargando...</div> : (
            <div className="space-y-3 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
              {byArea.map(a => (
                <div key={a.area}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white truncate max-w-[200px]">{a.area}</span>
                    <span className="text-[#00A9E0] font-semibold ml-2">{a.count}</span>
                  </div>
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#00A9E0] to-[#00d4ff] rounded-full transition-all"
                      style={{ width: `${(a.count / maxArea) * 100}%` }} />
                  </div>
                </div>
              ))}
              {byArea.length === 0 && <p className="text-slate-500 text-sm">Sin datos</p>}
            </div>
          )}
        </div>

        {/* Por puerta */}
        <div className="bg-[#111e35] border border-[#00A9E0]/15 rounded-2xl p-6">
          <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
            <DoorOpen className="w-4 h-4 text-[#00A9E0]" /> Visitas por puerta
          </h2>
          {loading ? <div className="h-32 flex items-center justify-center text-slate-500">Cargando...</div> : (
            <div className="space-y-3">
              {byDoor.map(d => {
                const maxDoor = Math.max(...byDoor.map(x => x.count), 1)
                return (
                  <div key={d.door}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-white">{d.door}</span>
                      <span className="text-orange-400 font-semibold">{d.count}</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"
                        style={{ width: `${(d.count / maxDoor) * 100}%` }} />
                    </div>
                  </div>
                )
              })}
              {byDoor.length === 0 && <p className="text-slate-500 text-sm">Sin datos</p>}
            </div>
          )}
        </div>

        {/* Tabla resumen últimos días */}
        <div className="bg-[#111e35] border border-[#00A9E0]/15 rounded-2xl p-6">
          <h2 className="text-white font-semibold mb-4">Detalle diario (últimos días)</h2>
          <div className="overflow-y-auto max-h-52">
            <table className="w-full">
              <thead><tr className="text-left"><th className="pb-2 text-xs text-slate-400 font-semibold">Fecha</th><th className="pb-2 text-xs text-slate-400 font-semibold text-right">Visitas</th></tr></thead>
              <tbody className="divide-y divide-slate-800">
                {daily.slice().reverse().map(d => (
                  <tr key={d.date}>
                    <td className="py-2 text-sm text-white">{d.date}</td>
                    <td className="py-2 text-sm text-[#00A9E0] font-semibold text-right">{d.count}</td>
                  </tr>
                ))}
                {daily.length === 0 && <tr><td colSpan={2} className="py-4 text-center text-slate-500 text-sm">Sin datos para el período</td></tr>}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}
