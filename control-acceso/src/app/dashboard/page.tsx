'use client'
import { useState, useEffect, useCallback } from 'react'
import { Users, LogIn, Clock, TrendingUp, Calendar, AlertCircle, Activity, BarChart3, DoorOpen } from 'lucide-react'

// Componente para las tarjetas de stats
function StatCard({ title, value, icon: Icon, trend, color }: any) {
  const colors: any = {
    blue: 'text-[#00A9E0] bg-[#00A9E0]/10 border-[#00A9E0]/20',
    purple: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
    green: 'text-green-400 bg-green-400/10 border-green-400/20',
    orange: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
  }
  return (
    <div className={`bg-[#111e35] border rounded-2xl p-6 ${colors[color]}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 rounded-xl bg-white/5">
          <Icon className="w-5 h-5" />
        </div>
        <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-white/10 uppercase tracking-wider">{trend}</span>
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-slate-400 text-xs mt-1 font-medium">{title}</p>
    </div>
  )
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ total: 0, avgDaily: 0, active: 0, avgDuration: 0 })
  const [chartData, setChartData] = useState<{ day: string, count: number }[]>([])
  const [isSuperAdmin, setIsSuperAdmin] = useState(false)
  const [showResetConfirm, setShowResetConfirm] = useState(false)
  const [resetLoading, setResetLoading] = useState(false)
  const [serverInfo, setServerInfo] = useState({ ip: '...', offline: true })

  const loadData = useCallback(async () => {
    setLoading(true)
    try {
      const resMe = await fetch('/api/users/me')
      const profile = await resMe.json()
      if (!profile) return
      setIsSuperAdmin(profile.role === 'superadmin')

      const resStats = await fetch(`/api/stats?company_id=${profile.role !== 'superadmin' ? profile.company_id : ''}`)
      const data = await resStats.json()
      
        if (data.stats) {
          setStats(data.stats)
          setChartData(data.chartData)
        }

        const resInfo = await fetch('/api/info')
        const info = await resInfo.json()
        setServerInfo(info)
      } catch (err) {
      console.error('Error cargando stats:', err)
    }
    setLoading(false)
  }, [])

  useEffect(() => { loadData() }, [loadData])

  async function handleSystemReset() {
    if (!confirm('¿ESTÁS ABSOLUTAMENTE SEGURO? Esta acción borrará TODO y no se puede deshacer.')) return
    
    setResetLoading(true)
    try {
      const res = await fetch('/api/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const json = await res.json()
      if (json.error) throw new Error(json.error)

      alert('Sistema reseteado con éxito. Solo quedan las cuentas de Super Administrador.')
      window.location.reload()
    } catch (err: any) {
      alert('Error en el reset: ' + err.message)
    } finally {
      setResetLoading(false)
      setShowResetConfirm(false)
    }
  }

  if (loading) return <div className="p-8 text-slate-400">Cargando estadísticas...</div>

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Panel de Control</h1>
          <p className="text-slate-400 text-sm mt-1">Resumen de actividad de los últimos 7 días</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-[#111e35] border border-slate-800 rounded-xl">
          <Calendar className="w-4 h-4 text-[#00A9E0]" />
          <span className="text-slate-300 text-sm font-medium">Últimos 7 días</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Visitas" value={stats.total} icon={Users} trend="+12%" color="blue" />
        <StatCard title="Promedio Diario" value={stats.avgDaily} icon={TrendingUp} trend="+5%" color="purple" />
        <StatCard title="Visitas Activas" value={stats.active} icon={Activity} trend="En tiempo real" color="green" />
        <StatCard title="Duración Promedio" value={`${stats.avgDuration}m`} icon={Clock} trend="-2m" color="orange" />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart */}
        <div className="bg-[#111e35] border border-[#00A9E0]/15 rounded-2xl p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#00A9E0]" /> Frecuencia de Ingresos
            </h3>
            <div className="flex items-center gap-2 text-[10px] text-slate-400">
              <span className="w-2 h-2 rounded-full bg-[#00A9E0]"></span> Ingresos
            </div>
          </div>
          
          <div className="h-40 flex items-end gap-2 px-2 relative">
            {chartData.every(d => d.count === 0) ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-slate-500 text-sm italic">Sin actividad registrada en los últimos 7 días</p>
              </div>
            ) : (
              chartData.map((d, i) => {
                const max = Math.max(...chartData.map(x => x.count), 1)
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="relative w-full flex items-end justify-center h-28">
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#00A9E0] text-white text-[10px] font-bold rounded px-1.5 py-0.5 opacity-0 group-hover:opacity-100 transition">
                        {d.count}
                      </div>
                      <div className="w-full max-w-[32px] bg-gradient-to-t from-[#00A9E0] to-[#00d4ff] rounded-t-md transition-all group-hover:brightness-110"
                        style={{ height: `${(d.count / max) * 100}%`, minHeight: d.count > 0 ? '4px' : '0' }} />
                    </div>
                    <span className="text-slate-500 text-[10px] font-bold uppercase">{d.day}</span>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-[#00A9E0]/20 to-transparent border border-[#00A9E0]/20 rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-2">Acceso Rápido</h3>
            <div className="grid grid-cols-1 gap-2">
              <a href="/dashboard/registro" className="flex items-center justify-center py-2 bg-[#00A9E0] text-white text-xs font-bold rounded-lg hover:bg-[#00bfff] transition">NUEVO INGRESO</a>
              <a href="/dashboard/salida" className="flex items-center justify-center py-2 bg-slate-800 text-white text-xs font-bold rounded-lg hover:bg-slate-700 transition">REGISTRAR SALIDA</a>
            </div>
          </div>

          <div className="bg-[#111e35] border border-green-500/30 rounded-2xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2 bg-green-500/10 rounded-bl-xl">
              <Activity className="w-4 h-4 text-green-400" />
            </div>
            <h3 className="text-white font-semibold mb-1">Conexión Móvil</h3>
            <p className="text-slate-400 text-[10px] mb-3 uppercase tracking-wider">Escáner Samsung (Tablet/Celular)</p>
            
            <div className="space-y-3">
              <div className="bg-black/20 rounded-xl p-3 border border-white/5">
                <p className="text-[10px] text-slate-500 mb-1">URL PARA EL CELULAR:</p>
                <code className="text-[#00A9E0] font-mono text-sm font-bold">http://{serverInfo.ip}:3001</code>
              </div>
              <p className="text-slate-500 text-[9px] leading-relaxed">
                Ingresa esta dirección en el navegador de tu Samsung para activar el escáner remoto. 
                <span className="text-green-400/80"> Modo Offline Activo.</span>
              </p>
            </div>
          </div>

          {isSuperAdmin && (
            <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6">
              <h3 className="text-red-400 font-semibold mb-2 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" /> Zona de Peligro
              </h3>
              <p className="text-slate-500 text-xs mb-4">Reset total del sistema (excepto Super Admins).</p>
              
              {!showResetConfirm ? (
                <button onClick={() => setShowResetConfirm(true)}
                  className="w-full py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 text-xs font-bold rounded-lg border border-red-500/30 transition">
                  RESET TOTAL DEL SISTEMA
                </button>
              ) : (
                <div className="space-y-2">
                  <p className="text-white text-[10px] font-bold text-center mb-2 text-red-500">¿ESTÁS SEGURO?</p>
                  <button onClick={handleSystemReset} disabled={resetLoading}
                    className="w-full py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-lg transition">
                    {resetLoading ? 'BORRANDO...' : 'SÍ, BORRAR TODO'}
                  </button>
                  <button onClick={() => setShowResetConfirm(false)}
                    className="w-full py-2 bg-slate-800 text-slate-300 text-xs font-bold rounded-lg hover:bg-slate-700 transition">
                    CANCELAR
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
