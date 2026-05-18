'use client'
import { useState, useEffect, useCallback } from 'react'
import { DoorOpen, Plus, Users, CheckCircle, AlertCircle, X, Edit2, Save, Building2, Shield, UserCheck } from 'lucide-react'

interface Door { id: string; name: string; location: string | null; active: boolean; company_id: string }
interface UserProfile { id: string; full_name: string; role: string; active: boolean; door_id: string | null }
interface Company { id: string; name: string }

const inputCls = "w-full bg-[#0a1628] border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-[#00A9E0] transition text-sm"

const roleIcon: Record<string, any> = { superadmin: Shield, admin: UserCheck, guard: DoorOpen }
const roleBadge: Record<string, string> = {
  superadmin: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  admin: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  guard: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
}
const roleLabel: Record<string, string> = { superadmin: 'Super Admin', admin: 'Administrador', guard: 'Guardia' }

export default function PuertasPage() {
  const [doors, setDoors] = useState<Door[]>([])
  const [users, setUsers] = useState<UserProfile[]>([])
  const [companies, setCompanies] = useState<Company[]>([])
  const [userRole, setUserRole] = useState('')
  const [selectedCompany, setSelectedCompany] = useState('')
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editDoor, setEditDoor] = useState<Door | null>(null)
  const [assigningDoor, setAssigningDoor] = useState<string | null>(null)
  const [selectedUser, setSelectedUser] = useState('')
  const [filterRole, setFilterRole] = useState<string>('all')
  const [status, setStatus] = useState<'idle' | 'ok' | 'err'>('idle')
  const [statusMsg, setStatusMsg] = useState('')
  const [form, setForm] = useState({ name: '', location: '' })

  const loadProfile = useCallback(async () => {
    try {
      const res = await fetch('/api/users/me')
      const p = await res.json()
      if (!p) return
      setUserRole(p.role)
      if (p.role === 'superadmin') {
        const resComps = await fetch('/api/companies')
        const comps = await resComps.json()
        setCompanies(comps || [])
        if (comps && comps.length > 0) setSelectedCompany(comps[0].id)
      } else {
        setSelectedCompany(p.company_id)
      }
    } catch (err) {
      console.error('Error perfil:', err)
    }
  }, [])

  useEffect(() => { loadProfile() }, [loadProfile])
  async function loadData(companyId: string) {
    if (!companyId) {
      setDoors([])
      setUsers([])
      setLoading(false)
      return
    }
    setLoading(true)
    try {
      const [resDoors, resUsers] = await Promise.all([
        fetch(`/api/doors?company_id=${companyId}`),
        fetch(`/api/users?company_id=${companyId}`)
      ])
      const d = await resDoors.json()
      const u = await resUsers.json()
      setDoors(d || [])
      setUsers(u || [])
    } catch (err) {
      console.error('Error datos:', err)
    }
    setLoading(false)
  }

  useEffect(() => { loadData(selectedCompany) }, [selectedCompany])

  function toast(ok: boolean, msg: string) {
    setStatus(ok ? 'ok' : 'err'); setStatusMsg(msg)
    setTimeout(() => setStatus('idle'), 4000)
  }

  async function saveDoor() {
    if (!form.name.trim()) { toast(false, 'El nombre es obligatorio'); return }
    try {
      const method = editDoor ? 'PUT' : 'POST'
      const body = editDoor 
        ? { id: editDoor.id, name: form.name, location: form.location }
        : { company_id: selectedCompany, name: form.name, location: form.location }

      const res = await fetch('/api/doors', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      
      if (res.ok) {
        toast(true, editDoor ? 'Puerta actualizada' : 'Puerta creada')
        setShowForm(false)
        setEditDoor(null)
        setForm({ name: '', location: '' })
        loadData(selectedCompany)
      } else {
        const err = await res.json()
        toast(false, err.error || 'Error al guardar')
      }
    } catch (err: any) {
      toast(false, err.message)
    }
  }

  async function toggleDoor(id: string, active: boolean) {
    await fetch('/api/doors', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, active: !active })
    })
    loadData(selectedCompany)
  }

  async function assignUserToDoor(doorId: string) {
    if (!selectedUser) { toast(false, 'Selecciona un usuario'); return }
    await fetch('/api/users', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: selectedUser, door_id: doorId })
    })
    toast(true, 'Usuario asignado a la puerta')
    setAssigningDoor(null); setSelectedUser(''); loadData(selectedCompany)
  }

  async function removeUserFromDoor(userId: string, userName: string) {
    await fetch('/api/users', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: userId, door_id: null })
    })
    toast(true, `${userName} removido de la puerta`); loadData(selectedCompany)
  }

  function usersForDoor(doorId: string) { return users.filter(u => u.door_id === doorId) }
  function availableUsers() {
    const filtered = users.filter(u => filterRole === 'all' || u.role === filterRole)
    return filtered
  }

  function startEdit(door: Door) {
    setEditDoor(door); setForm({ name: door.name, location: door.location || '' }); setShowForm(true)
  }

  return (
    <div className="p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Configuración de Puertas</h1>
          <p className="text-slate-400 text-sm mt-1">Asigna guardias y administradores a cada punto de acceso</p>
        </div>
        <div className="flex gap-3 flex-wrap">
          {userRole === 'superadmin' && companies.length > 0 && (
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-slate-400" />
              <select value={selectedCompany} onChange={e => setSelectedCompany(e.target.value)}
                className="bg-[#111e35] border border-slate-700 rounded-xl px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00A9E0]">
                {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          )}
          <button onClick={() => { setEditDoor(null); setForm({ name: '', location: '' }); setShowForm(!showForm) }}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#00A9E0] hover:bg-[#00bfff] text-white rounded-xl text-sm font-semibold transition">
            <Plus className="w-4 h-4" /> Nueva Puerta
          </button>
        </div>
      </div>

      {status === 'ok' && <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-xl p-3 text-green-300 text-sm mb-4"><CheckCircle className="w-4 h-4" />{statusMsg}</div>}
      {status === 'err' && <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-red-300 text-sm mb-4"><AlertCircle className="w-4 h-4" />{statusMsg}</div>}

      {/* Form crear/editar puerta */}
      {showForm && (
        <div className="bg-[#111e35] border border-[#00A9E0]/20 rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">{editDoor ? `Editar: ${editDoor.name}` : 'Nueva puerta de acceso'}</h3>
            <button onClick={() => { setShowForm(false); setEditDoor(null) }}><X className="w-4 h-4 text-slate-400 hover:text-white" /></button>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm text-slate-300 mb-1">Nombre de la puerta *</label>
              <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="Puerta Principal, Acceso Bodega..." className={inputCls} />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1">Ubicación / Referencia</label>
              <input type="text" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                placeholder="Lobby piso 1, Sector norte..." className={inputCls} />
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={saveDoor} className="flex items-center gap-2 px-5 py-2.5 bg-[#00A9E0] hover:bg-[#00bfff] text-white rounded-xl text-sm font-semibold transition">
              <Save className="w-4 h-4" />{editDoor ? 'Guardar cambios' : 'Crear puerta'}
            </button>
            <button onClick={() => { setShowForm(false); setEditDoor(null) }} className="px-5 py-2.5 bg-slate-800 text-slate-300 rounded-xl text-sm font-semibold hover:bg-slate-700 transition">Cancelar</button>
          </div>
        </div>
      )}

      {/* Grid de puertas */}
      {loading ? (
        <div className="py-12 text-center text-slate-500">Cargando...</div>
      ) : doors.length === 0 ? (
        <div className="py-16 text-center">
          <DoorOpen className="w-14 h-14 text-slate-700 mx-auto mb-4" />
          <p className="text-slate-400 font-medium">No hay puertas configuradas</p>
          <p className="text-slate-600 text-sm mt-1">Crea la primera puerta de acceso</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {doors.map(door => {
            const assigned = usersForDoor(door.id)
            return (
              <div key={door.id} className={`bg-[#111e35] rounded-2xl overflow-hidden border ${door.active ? 'border-[#00A9E0]/15' : 'border-red-500/15 opacity-70'}`}>

                {/* Header puerta */}
                <div className="px-5 py-4 flex items-start gap-3 border-b border-slate-800">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${door.active ? 'bg-orange-400/15' : 'bg-slate-700/50'}`}>
                    <DoorOpen className={`w-5 h-5 ${door.active ? 'text-orange-400' : 'text-slate-500'}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold">{door.name}</h3>
                    {door.location && <p className="text-slate-400 text-xs mt-0.5">📍 {door.location}</p>}
                    <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full border ${door.active ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                      {door.active ? '● Activa' : '● Inactiva'}
                    </span>
                  </div>
                  <div className="flex gap-1.5">
                    <button onClick={() => startEdit(door)} title="Editar"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-[#00A9E0] hover:bg-[#00A9E0]/10 transition">
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => toggleDoor(door.id, door.active)}
                      className={`px-2 py-1 rounded-lg text-xs font-medium border transition ${door.active ? 'text-red-400 border-red-500/20 hover:bg-red-500/10' : 'text-green-400 border-green-500/20 hover:bg-green-500/10'}`}>
                      {door.active ? 'Desactivar' : 'Activar'}
                    </button>
                  </div>
                </div>

                {/* Usuarios asignados */}
                <div className="px-5 py-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide flex items-center gap-1">
                      <Users className="w-3 h-3" /> Usuarios en esta puerta
                    </p>
                    <button onClick={() => { setAssigningDoor(door.id); setSelectedUser(''); setFilterRole('all') }}
                      className="text-xs text-[#00A9E0] hover:text-white flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-[#00A9E0]/10 transition">
                      <Plus className="w-3 h-3" /> Asignar usuario
                    </button>
                  </div>

                  {/* Panel asignación */}
                  {assigningDoor === door.id && (
                    <div className="bg-[#0a1628] rounded-xl p-3 mb-3 space-y-2">
                      <div className="flex gap-2">
                        {/* Filtro por rol */}
                        <select value={filterRole} onChange={e => setFilterRole(e.target.value)}
                          className="bg-[#111e35] border border-slate-700 rounded-lg px-2 py-2 text-white text-xs focus:outline-none focus:border-[#00A9E0] transition w-32 flex-shrink-0">
                          <option value="all">Todos los roles</option>
                          <option value="guard">Guardias</option>
                          <option value="admin">Admins</option>
                          <option value="superadmin">Super Admin</option>
                        </select>
                        <select value={selectedUser} onChange={e => setSelectedUser(e.target.value)}
                          className="flex-1 bg-[#111e35] border border-slate-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00A9E0] transition">
                          <option value="">Seleccionar usuario...</option>
                          {availableUsers().map(u => (
                            <option key={u.id} value={u.id}>
                              {u.full_name} ({roleLabel[u.role]})
                              {u.door_id && u.door_id !== door.id ? ' — en otra puerta' : ''}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => assignUserToDoor(door.id)}
                          className="px-4 py-2 bg-[#00A9E0] hover:bg-[#00bfff] text-white rounded-lg text-sm font-semibold transition">
                          Asignar
                        </button>
                        <button onClick={() => setAssigningDoor(null)}
                          className="px-3 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Lista asignados */}
                  {assigned.length > 0 ? (
                    <div className="space-y-1.5">
                      {assigned.map(u => {
                        const RIcon = roleIcon[u.role] || Users
                        return (
                          <div key={u.id} className="flex items-center gap-2.5 bg-[#0a1628] rounded-xl px-3 py-2.5">
                            <div className="w-7 h-7 rounded-lg bg-[#00A9E0]/15 flex items-center justify-center flex-shrink-0">
                              <RIcon className="w-3.5 h-3.5 text-[#00A9E0]" />
                            </div>
                            <div className="flex-1">
                              <p className="text-white text-sm font-medium leading-tight">{u.full_name}</p>
                              <span className={`text-xs px-1.5 py-0.5 rounded border ${roleBadge[u.role]}`}>
                                {roleLabel[u.role]}
                              </span>
                            </div>
                            <span className={`text-xs font-medium ${u.active ? 'text-green-400' : 'text-red-400'}`}>
                              {u.active ? '● Activo' : '○ Inactivo'}
                            </span>
                            <button onClick={() => removeUserFromDoor(u.id, u.full_name)} title="Quitar de esta puerta"
                              className="text-slate-500 hover:text-red-400 transition p-1 rounded hover:bg-red-500/10">
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-slate-600 text-sm">Sin usuarios asignados</p>
                      <p className="text-slate-700 text-xs mt-0.5">Asigna guardias o admins a esta puerta</p>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
