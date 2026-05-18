'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { History, User, Clock, DoorOpen, Search } from 'lucide-react'

interface Visit {
  id: string
  entry_time: string
  exit_time: string | null
  area: string
  persons: {
    full_name: string
    rut: string
    visitor_company: string
  }
}

export default function HoyPage() {
  const [visits, setVisits] = useState<Visit[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const supabase = createClient()

  async function loadVisits() {
    setLoading(true)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    try {
      const res = await fetch(`/api/visits?dateFrom=${today.toISOString()}&limit=100`, { cache: 'no-store' })
      const data = await res.json()
      // Adaptar el formato de la API al formato esperado por el componente
      const formattedVisits = (data.visits || []).map((v: any) => ({
        id: v.id,
        entry_time: v.entry_time,
        exit_time: v.exit_time,
        area: v.area,
        persons: {
          full_name: v.person?.full_name,
          rut: v.person?.rut,
          visitor_company: v.visitor_company
        }
      }))
      setVisits(formattedVisits)
    } catch (err) {
      console.error('Error cargando visitas de hoy:', err)
    }
    setLoading(false)
  }

  useEffect(() => { loadVisits() }, [])

  const filtered = visits.filter(v => 
    v.persons.full_name.toLowerCase().includes(search.toLowerCase()) ||
    v.persons.rut.includes(search)
  )

  return (
    <div className="p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <History className="w-6 h-6 text-[#00A9E0]" /> Visitas de Hoy
          </h1>
          <p className="text-slate-400 text-sm mt-1">Registros realizados desde las 00:00 hrs</p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Buscar por nombre o RUT..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#111e35] border border-[#00A9E0]/20 rounded-xl py-2.5 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-[#00A9E0] transition"
          />
        </div>
      </div>

      <div className="bg-[#111e35] border border-[#00A9E0]/15 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-500">Cargando visitas...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <User className="w-12 h-12 mx-auto mb-4 opacity-10" />
            <p>No hay visitas registradas el día de hoy con esos criterios.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white/5 border-b border-white/10 text-slate-400 text-xs font-bold uppercase tracking-wider">
                  <th className="px-6 py-4">Hora</th>
                  <th className="px-6 py-4">Visitante</th>
                  <th className="px-6 py-4">Empresa / Área</th>
                  <th className="px-6 py-4">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((v) => (
                  <tr key={v.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-white font-medium">
                        <Clock className="w-3.5 h-3.5 text-[#00A9E0]" />
                        {new Date(v.entry_time).toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-white font-semibold">{v.persons.full_name}</p>
                      <p className="text-slate-500 text-xs">{v.persons.rut}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-slate-300 text-sm">{v.persons.visitor_company || 'Particular'}</p>
                      <p className="text-[#00A9E0] text-xs flex items-center gap-1">
                        <DoorOpen className="w-3 h-3" /> {v.area}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      {v.exit_time ? (
                        <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 text-[10px] font-bold uppercase">
                          Salió {new Date(v.exit_time).toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 text-[10px] font-bold uppercase animate-pulse">
                          En recinto
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
