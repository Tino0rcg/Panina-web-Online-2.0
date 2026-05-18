'use client'
import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Search, Download, ChevronLeft, ChevronRight, Clock, CheckCircle, Building2, DoorOpen, Trash2, AlertTriangle } from 'lucide-react'
import * as XLSX from 'xlsx'

interface Visit {
  id: string; entry_time: string; exit_time: string | null
  visited_person: string; area: string; reason: string
  visitor_company: string | null; vehicle_plate: string | null; notes: string | null
  person: { id: string; full_name: string; rut: string; is_conflictive?: boolean }
  door: { name: string; companies?: { name: string } }
}

const PAGE_SIZE = 25

function fmtDateTime(iso: string) {
  const d = new Date(iso)
  const fecha = d.toLocaleDateString('es-CL', { day: '2-digit', month: '2-digit', year: 'numeric' })
  const hora = d.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })
  return { fecha, hora }
}

function duracion(entry: string, exit: string | null) {
  if (!exit) return null
  const mins = Math.round((new Date(exit).getTime() - new Date(entry).getTime()) / 60000)
  if (mins < 60) return `${mins} min`
  return `${Math.floor(mins / 60)}h ${mins % 60}m`
}

export default function HistorialPage() {
  const [visits, setVisits] = useState<Visit[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({ search: '', dateFrom: '', dateTo: '', area: '', door: '' })
  const [doors, setDoors] = useState<{ id: string; name: string }[]>([])
  const supabase = createClient()

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const resMe = await fetch('/api/users/me')
      const profile = await resMe.json()

      // Cargar puertas para filtro
      if (doors.length === 0 && profile?.company_id) {
        const resDoors = await fetch(`/api/doors?company_id=${profile.company_id}`)
        setDoors(await resDoors.json())
      }

      // Construir URL con filtros
      let url = `/api/visits?page=${page}&limit=${PAGE_SIZE}`
      if (profile?.role !== 'superadmin') url += `&company_id=${profile?.company_id}`
      if (filters.dateFrom) url += `&dateFrom=${filters.dateFrom}`
      if (filters.dateTo) url += `&dateTo=${filters.dateTo}`
      if (filters.area) url += `&area=${filters.area}`
      if (filters.door) url += `&door_id=${filters.door}`
      if (filters.search) url += `&query=${filters.search}`

      const resVisits = await fetch(url, { cache: 'no-store' })
      const data = await resVisits.json()
      
      setVisits(data.visits || [])
      setTotal(data.total || 0)
    } catch (err) {
      console.error('Error cargando historial:', err)
    }
    setLoading(false)
  }, [page, filters, doors.length])

  useEffect(() => { load() }, [load])

  async function handleInactivate(visitId: string) {
    if (!confirm('¿Seguro que deseas eliminar lógicamente este registro? Dejará de aparecer en estadísticas y reportes.')) return
    try {
      const res = await fetch('/api/visits/inactivate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visit_id: visitId })
      })
      if (res.ok) load()
      else alert('Error al eliminar registro')
    } catch (err) {
      alert('Error de conexión')
    }
  }

  const [conflictModal, setConflictModal] = useState<{ personId: string, current: boolean } | null>(null)
  const [conflictNotes, setConflictNotes] = useState('')

  async function handleToggleConflict() {
    if (!conflictModal) return;
    const { personId, current } = conflictModal;
    const isNowConflictive = !current;

    try {
      const res = await fetch('/api/persons/conflict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ person_id: personId, is_conflictive: isNowConflictive, notes: conflictNotes })
      })
      if (res.ok) {
        setConflictModal(null);
        setConflictNotes('');
        load()
      } else alert('Error al actualizar estado')
    } catch (err) {
      alert('Error de conexión')
    }
  }

  function exportXLSX() {
    const rows = visits.map(v => {
      const entrada = fmtDateTime(v.entry_time)
      return {
        'Nombre Visitante': (v.person as any)?.full_name,
        'RUT': (v.person as any)?.rut,
        'Empresa Visitante': v.visitor_company || '',
        'Visita a': v.visited_person,
        'Área': v.area,
        'Motivo': v.reason,
        'Puerta': (v.door as any)?.name,
        'Fecha Entrada': entrada.fecha,
        'Hora Entrada': entrada.hora,
        'Fecha Salida': v.exit_time ? fmtDateTime(v.exit_time).fecha : '',
        'Hora Salida': v.exit_time ? fmtDateTime(v.exit_time).hora : 'Sin registrar',
        'Duración': duracion(v.entry_time, v.exit_time) || '',
        'Placa Vehículo': v.vehicle_plate || '',
        'Observaciones': v.notes || '',
      }
    })
    const ws = XLSX.utils.json_to_sheet(rows)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Historial')
    XLSX.writeFile(wb, `historial_visitas_${new Date().toISOString().slice(0, 10)}.xlsx`)
  }

  const totalPages = Math.ceil(total / PAGE_SIZE)
  const setF = (key: string, val: string) => { setFilters(f => ({ ...f, [key]: val })); setPage(0) }

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Historial de Visitas</h1>
          <p className="text-slate-400 text-sm mt-1">{total.toLocaleString('es-CL')} registros en total</p>
        </div>
        <button onClick={exportXLSX}
          className="flex items-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-500 text-white rounded-xl text-sm font-semibold transition">
          <Download className="w-4 h-4" /> Exportar Excel
        </button>
      </div>

      {/* Filtros */}
      <div className="bg-[#111e35] border border-[#00A9E0]/15 rounded-2xl p-4 mb-6 grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="col-span-2 md:col-span-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Nombre o RUT..." value={filters.search}
            onChange={e => setF('search', e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 bg-[#0a1628] border border-slate-700 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-[#00A9E0] transition" />
        </div>
        <input type="date" value={filters.dateFrom} onChange={e => setF('dateFrom', e.target.value)}
          className="py-2.5 px-3 bg-[#0a1628] border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-[#00A9E0] transition" />
        <input type="date" value={filters.dateTo} onChange={e => setF('dateTo', e.target.value)}
          className="py-2.5 px-3 bg-[#0a1628] border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-[#00A9E0] transition" />
        <input type="text" placeholder="Área..." value={filters.area} onChange={e => setF('area', e.target.value)}
          className="py-2.5 px-3 bg-[#0a1628] border border-slate-700 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:border-[#00A9E0] transition" />
        <select value={filters.door} onChange={e => setF('door', e.target.value)}
          className="py-2.5 px-3 bg-[#0a1628] border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-[#00A9E0] transition">
          <option value="">Todas las puertas</option>
          {doors.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
        </select>
      </div>

      {/* Tabla */}
      <div className="bg-[#111e35] border border-[#00A9E0]/15 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-slate-800 bg-[#0d1f3a]">
                {['Visitante / RUT', 'Empresa', 'Visita a / Área', 'Puerta', 'Entrada', 'Salida', 'Duración', 'Acciones'].map(h => (
                  <th key={h} className="px-3 py-2.5 text-left text-[10px] font-semibold text-slate-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {loading ? (
                <tr><td colSpan={7} className="px-4 py-12 text-center text-slate-500">Cargando registros...</td></tr>
              ) : visits.length === 0 ? (
                <tr><td colSpan={7} className="px-4 py-12 text-center text-slate-500">No se encontraron registros con los filtros actuales</td></tr>
              ) : visits.map(v => {
                const entrada = fmtDateTime(v.entry_time)
                const dur = duracion(v.entry_time, v.exit_time)
                return (
                  <tr key={v.id} className="hover:bg-white/2 transition">
                    <td className="px-3 py-2">
                      <p className="text-white font-semibold truncate max-w-[140px]">{(v.person as any)?.full_name}</p>
                      <p className="text-[#00A9E0] text-[11px] font-mono">{(v.person as any)?.rut}</p>
                    </td>
                    <td className="px-3 py-2">
                      <p className="text-slate-300 truncate max-w-[100px]">{v.visitor_company || <span className="text-slate-600 italic">—</span>}</p>
                    </td>
                    <td className="px-3 py-2">
                      <p className="text-white truncate max-w-[120px]">{v.visited_person}</p>
                      <p className="text-slate-400 text-[11px] truncate max-w-[120px]">{v.area}</p>
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-1 text-slate-400 text-[11px] whitespace-nowrap">
                        <DoorOpen className="w-3 h-3 flex-shrink-0" />{(v.door as any)?.name}
                      </div>
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      <span className="text-white font-semibold">{entrada.fecha}</span>
                      <span className="text-[#00A9E0] text-[11px] font-mono ml-1">{entrada.hora}</span>
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      {v.exit_time ? (
                        <span className="text-green-300 text-[11px]">
                          <CheckCircle className="w-3 h-3 inline mr-0.5" />{fmtDateTime(v.exit_time).fecha} {fmtDateTime(v.exit_time).hora}
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-0.5 bg-yellow-500/15 text-yellow-300 text-[11px] rounded-full border border-yellow-500/20">Adentro</span>
                      )}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      {dur ? <span className="text-slate-300">{dur}</span> : <span className="text-slate-600">—</span>}
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-1">
                        <button 
                          onClick={() => setConflictModal({ personId: v.person.id, current: !!v.person.is_conflictive })}
                          title={v.person.is_conflictive ? "Quitar alerta de conflicto" : "Marcar como conflictivo"}
                          className={`p-1 rounded-lg transition ${v.person.is_conflictive ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 'bg-slate-800 text-slate-500 hover:text-red-400 hover:bg-slate-700'}`}
                        >
                          <AlertTriangle className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => handleInactivate(v.id)}
                          title="Eliminar registro (Lógico)"
                          className="p-1 rounded-lg bg-slate-800 text-slate-500 hover:text-white hover:bg-red-600 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-slate-800 flex items-center justify-between">
            <p className="text-slate-400 text-sm">Mostrando {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, total)} de {total.toLocaleString('es-CL')}</p>
            <div className="flex gap-2">
              <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}
                className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-30 transition">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-3 py-2 text-sm text-slate-400">{page + 1} / {totalPages}</span>
              <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1}
                className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-30 transition">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal de Conflictivo */}
      {conflictModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-[#111e35] border border-[#00A9E0]/30 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className={`w-6 h-6 ${conflictModal.current ? 'text-green-400' : 'text-red-500'}`} />
              <h2 className="text-white font-bold text-lg">
                {conflictModal.current ? 'Quitar marca de conflictivo' : 'Marcar como conflictivo'}
              </h2>
            </div>
            
            {!conflictModal.current && (
              <div className="mb-4">
                <label className="block text-sm text-slate-300 mb-2">Motivo o comportamiento (opcional):</label>
                <textarea 
                  value={conflictNotes}
                  onChange={e => setConflictNotes(e.target.value)}
                  placeholder="Ej: Intentó saltarse la fila..."
                  className="w-full bg-[#0a1628] border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#00A9E0] transition text-sm resize-none"
                  rows={3}
                />
              </div>
            )}
            
            {conflictModal.current && (
              <p className="text-slate-300 text-sm mb-6">
                ¿Estás seguro de que deseas quitar la marca de conflictivo a esta persona y permitirle el acceso nuevamente?
              </p>
            )}

            <div className="flex gap-3 justify-end">
              <button 
                onClick={() => { setConflictModal(null); setConflictNotes(''); }}
                className="px-5 py-2.5 rounded-xl text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 font-semibold transition text-sm"
              >
                Cancelar
              </button>
              <button 
                onClick={handleToggleConflict}
                className={`px-5 py-2.5 rounded-xl text-white font-semibold transition text-sm ${
                  conflictModal.current 
                    ? 'bg-green-600 hover:bg-green-500' 
                    : 'bg-red-600 hover:bg-red-500'
                }`}
              >
                {conflictModal.current ? 'Sí, Permitir Acceso' : 'Bloquear Acceso'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
