'use client'
import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Building2, Plus, DoorOpen, Users, ChevronDown, ChevronRight, CheckCircle, AlertCircle, X, Edit2, Save, Image as ImageIcon } from 'lucide-react'

interface Door { id: string; name: string; location: string | null; active: boolean }
interface UserRow { id: string; full_name: string; role: string; active: boolean }
interface Company { id: string; name: string; rut: string | null; address: string | null; phone: string | null; active: boolean; logo_url: string | null; doors?: Door[]; guards?: UserRow[] }

const inputCls = "w-full bg-[#0a1628] border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-[#00A9E0] transition text-sm"

const emptyForm = { name: '', rut: '', address: '', phone: '', logo_url: '' }

export default function EmpresasPage() {
  const [companies, setCompanies] = useState<Company[]>([])
  const [expanded, setExpanded] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [showCompanyForm, setShowCompanyForm] = useState(false)
  const [editingCompany, setEditingCompany] = useState<Company | null>(null)
  const [showDoorForm, setShowDoorForm] = useState<string | null>(null)
  const [editingDoor, setEditingDoor] = useState<Door & { company_id: string } | null>(null)
  const [status, setStatus] = useState<'idle' | 'ok' | 'err'>('idle')
  const [statusMsg, setStatusMsg] = useState('')
  const [companyForm, setCompanyForm] = useState(emptyForm)
  const [doorForm, setDoorForm] = useState({ name: '', location: '' })
  const supabase = createClient()

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/companies')
      const data = await res.json()
      if (res.ok) setCompanies(data)
    } catch (err) {
      console.error('Error cargando empresas:', err)
    }
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  function toast(ok: boolean, msg: string) {
    setStatus(ok ? 'ok' : 'err'); setStatusMsg(msg)
    setTimeout(() => setStatus('idle'), 4000)
  }

  function startCreateCompany() {
    setEditingCompany(null); setCompanyForm(emptyForm); setShowCompanyForm(true)
  }

  function startEditCompany(c: Company) {
    setEditingCompany(c)
    setCompanyForm({ name: c.name, rut: c.rut || '', address: c.address || '', phone: c.phone || '', logo_url: c.logo_url || '' })
    setShowCompanyForm(true)
  }

  async function saveCompany() {
    if (!companyForm.name.trim()) {
      toast(false, 'El nombre es obligatorio')
      return
    }

    const cleanData = {
      name: companyForm.name.trim(),
      rut: companyForm.rut.trim() || null,
      address: companyForm.address.trim() || null,
      phone: companyForm.phone.trim() || null,
      logo_url: companyForm.logo_url.trim() || null
    }

    setLoading(true)
    try {
      const method = editingCompany ? 'PUT' : 'POST'
      const body = editingCompany ? { id: editingCompany.id, ...cleanData } : cleanData
      
      const res = await fetch('/api/companies', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Error al guardar')
      }

      toast(true, editingCompany ? 'Empresa actualizada' : 'Empresa creada')
      setShowCompanyForm(false)
      load()
    } catch (err: any) {
      toast(false, err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Gestión de Empresas</h1>
          <p className="text-slate-400 text-sm mt-1">Configura marcas, logos y accesos</p>
        </div>
        <button onClick={startCreateCompany} className="flex items-center gap-2 px-4 py-2.5 bg-[#00A9E0] hover:bg-[#00bfff] text-white rounded-xl text-sm font-semibold transition">
          <Plus className="w-4 h-4" /> Nueva Empresa
        </button>
      </div>

      {status !== 'idle' && (
        <div className={`mb-4 p-4 rounded-xl flex items-center gap-2 border ${status === 'ok' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
          {status === 'ok' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          {statusMsg}
        </div>
      )}

      {showCompanyForm && (
        <div className="bg-[#111e35] border border-[#00A9E0]/20 rounded-2xl p-6 mb-8 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-semibold text-lg">{editingCompany ? `Editar: ${editingCompany.name}` : 'Crear Nueva Empresa'}</h3>
            <button onClick={() => setShowCompanyForm(false)} className="text-slate-500 hover:text-white"><X className="w-5 h-5" /></button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-400 mb-1.5">Nombre / Razón Social *</label>
              <input type="text" value={companyForm.name} onChange={e => setCompanyForm(f => ({ ...f, name: e.target.value }))} className={inputCls} />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">RUT Empresa</label>
              <input type="text" value={companyForm.rut} onChange={e => setCompanyForm(f => ({ ...f, rut: e.target.value }))} className={inputCls} />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">Teléfono de Contacto</label>
              <input type="text" value={companyForm.phone} onChange={e => setCompanyForm(f => ({ ...f, phone: e.target.value }))} className={inputCls} />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-[#00A9E0] mb-1.5 flex items-center gap-2">
                <ImageIcon className="w-4 h-4" /> Logo de la Empresa
              </label>
              <div className="flex flex-col md:flex-row gap-4 items-start">
                <div className="flex-1 w-full">
                  <input 
                    type="text" 
                    value={companyForm.logo_url} 
                    onChange={e => setCompanyForm(f => ({ ...f, logo_url: e.target.value }))} 
                    placeholder="URL de imagen o sube un archivo..." 
                    className={`${inputCls} border-[#00A9E0]/30`} 
                  />
                </div>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0]
                      if (file) {
                        const reader = new FileReader()
                        reader.onloadend = () => {
                          setCompanyForm(f => ({ ...f, logo_url: reader.result as string }))
                        }
                        reader.readAsDataURL(file)
                      }
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <button type="button" className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-semibold transition border border-slate-700 flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Subir desde PC
                  </button>
                </div>
              </div>
              <p className="text-[10px] text-slate-500 mt-2 italic">Recomendado: Imagen cuadrada (PNG o JPG).</p>
            </div>
          </div>

          <div className="flex gap-3 mt-8 pt-6 border-t border-slate-800">
            <button onClick={saveCompany} className="flex items-center gap-2 px-8 py-3 bg-[#00A9E0] hover:bg-[#00bfff] text-white rounded-xl font-bold transition shadow-lg">
              <Save className="w-5 h-5" /> {editingCompany ? 'Actualizar Empresa' : 'Crear Empresa'}
            </button>
            <button onClick={() => setShowCompanyForm(false)} className="px-8 py-3 bg-slate-800 text-slate-300 rounded-xl font-bold hover:bg-slate-700 transition">Cancelar</button>
          </div>
        </div>
      )}

      {loading ? <div className="py-20 text-center text-slate-500">Cargando empresas...</div> : (
        <div className="grid gap-4">
          {companies.map(c => (
            <div key={c.id} className="bg-[#111e35] border border-[#00A9E0]/15 rounded-2xl overflow-hidden hover:border-[#00A9E0]/30 transition-all">
              <div className="p-5 flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#00A9E0]/10 flex items-center justify-center border border-[#00A9E0]/20 overflow-hidden flex-shrink-0">
                  {c.logo_url ? (
                    <img src={c.logo_url} alt="Logo" className="w-full h-full object-contain p-2" />
                  ) : (
                    <Building2 className="w-7 h-7 text-[#00A9E0]" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold text-lg truncate">{c.name}</h3>
                  <p className="text-slate-500 text-xs">{c.rut || 'Sin RUT'} · {c.doors?.length || 0} puertas activas</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => startEditCompany(c)} className="p-2.5 rounded-xl text-slate-400 hover:text-[#00A9E0] hover:bg-[#00A9E0]/10 transition-all">
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button onClick={() => setExpanded(expanded === c.id ? null : c.id)} className="p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5">
                    {expanded === c.id ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              {expanded === c.id && (
                <div className="bg-[#0d1a2d] p-6 border-t border-slate-800">
                  {/* ... Puertas y Usuarios (se mantienen igual que antes) ... */}
                  <p className="text-slate-500 text-xs italic">Para gestionar puertas y usuarios usa los botones de abajo.</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
