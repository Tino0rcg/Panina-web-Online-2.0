'use client'
import { useState, useRef, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { DoorOpen, Search, CheckCircle, AlertCircle, Clock } from 'lucide-react'

interface VisitRow {
  id: string
  entry_time: string
  visited_person: string
  area: string
  reason: string
  person: { full_name: string; rut: string }
}

export default function SalidaPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<VisitRow[]>([])
  const [searching, setSearching] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [statusMsg, setStatusMsg] = useState('')
  const scanRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  useEffect(() => { scanRef.current?.focus() }, [])

  async function searchByRut(rut: string) {
    if (!rut.trim()) return
    setSearching(true)
    setResults([])
    try {
      const res = await fetch(`/api/visits?query=${rut}`)
      const data = await res.json()
      // El API ahora devuelve { visits, total }
      const visits = data.visits || []
      // Filtrar solo los que no tienen hora de salida (activas)
      const actives = visits.filter((v: any) => !v.exit_time)
      setResults(actives)
    } catch (err) {
      console.error('Error buscando visitas:', err)
    }
    setSearching(false)
  }

  async function registerExit(visitId: string, name: string) {
    try {
      const res = await fetch('/api/visits/exit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visit_id: visitId })
      })

      if (!res.ok) throw new Error('Error al registrar salida')

      setStatus('success')
      setStatusMsg(`✓ Salida de ${name} registrada correctamente`)
      setResults(r => r.filter(v => v.id !== visitId))
      setTimeout(() => setStatus('idle'), 3000)
    } catch (err) {
      setStatus('error')
      setStatusMsg('Error al registrar salida.')
    }
  }

  function minutesSince(entry: string) {
    return Math.round((Date.now() - new Date(entry).getTime()) / 60000)
  }

  return (
    <div className="p-6 md:p-8 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-orange-400/20 flex items-center justify-center">
          <DoorOpen className="w-5 h-5 text-orange-400" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">Registro de Salida</h1>
          <p className="text-sm text-slate-400">Busque por RUT o nombre del visitante</p>
        </div>
      </div>

      {/* Buscador / campo de escaneo */}
      <div className="bg-[#111e35] border border-[#00A9E0]/15 rounded-2xl p-6 mb-6">
        <label className="block text-sm font-medium text-slate-300 mb-2">
          RUT o nombre del visitante
        </label>
        <div className="flex gap-3">
          <input
            ref={scanRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && searchByRut(query)}
            placeholder="Escanee cédula o escriba nombre / RUT..."
            className="flex-1 bg-[#0a1628] border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#00A9E0] transition"
          />
          <button
            onClick={() => searchByRut(query)}
            disabled={searching}
            className="px-5 py-3 bg-[#00A9E0] hover:bg-[#00bfff] text-white rounded-xl font-semibold transition flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            {searching ? '...' : 'Buscar'}
          </button>
        </div>
      </div>

      {/* Estado */}
      {status === 'success' && (
        <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-green-300 text-sm mb-4">
          <CheckCircle className="w-4 h-4 flex-shrink-0" /> {statusMsg}
        </div>
      )}
      {status === 'error' && (
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-300 text-sm mb-4">
          <AlertCircle className="w-4 h-4 flex-shrink-0" /> {statusMsg}
        </div>
      )}

      {/* Resultados */}
      {results.length > 0 && (
        <div className="bg-[#111e35] border border-[#00A9E0]/15 rounded-2xl overflow-hidden">
          <div className="px-6 py-3 border-b border-slate-800">
            <p className="text-sm text-slate-400">{results.length} visita(s) activa(s) encontrada(s)</p>
          </div>
          <div className="divide-y divide-slate-800">
            {results.map(v => (
              <div key={v.id} className="px-6 py-4 flex items-center gap-4">
                <div className="flex-1">
                  <p className="text-white font-semibold">{(v.person as any).full_name}</p>
                  <p className="text-[#00A9E0] text-xs font-mono">{(v.person as any).rut}</p>
                  <p className="text-slate-400 text-xs mt-1">
                    {v.area} · {v.visited_person} · {v.reason}
                  </p>
                </div>
                <div className="text-center mr-2">
                  <div className="flex items-center gap-1 text-slate-400 text-xs">
                    <Clock className="w-3 h-3" />
                    {minutesSince(v.entry_time)} min
                  </div>
                  <p className="text-slate-500 text-xs">
                    Entró {new Date(v.entry_time).toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <button
                  onClick={() => registerExit(v.id, (v.person as any).full_name)}
                  className="px-4 py-2 bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/30 text-orange-300 rounded-xl text-sm font-semibold transition whitespace-nowrap"
                >
                  Registrar Salida
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {results.length === 0 && query && !searching && (
        <div className="text-center py-12 text-slate-500">
          No se encontraron visitas activas para "{query}"
        </div>
      )}
    </div>
  )
}
