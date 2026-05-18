'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Plus, Shield, UserCheck, DoorOpen, AlertCircle, CheckCircle, Edit2, Save, X, Users } from 'lucide-react'

interface UserRow { id: string; email: string; full_name: string; role: string; active: boolean; door_id: string | null; company_id: string | null; guard_company?: string; doors?: { name: string } | null }
interface Door { id: string; name: string }
interface Company { id: string; name: string }

const inputCls = "w-full bg-[#0a1628] border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-[#00A9E0] transition text-sm"

const roleLabel: Record<string, string> = { superadmin: 'Super Admin', admin: 'Administrador', guard: 'Guardia' }
const roleBadge: Record<string, string> = {
  superadmin: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  admin: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  guard: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
}
const RoleIcons: Record<string, any> = { superadmin: Shield, admin: UserCheck, guard: DoorOpen }

export default function UsuariosPage() {
  const [users, setUsers] = useState<UserRow[]>([])
  const [doors, setDoors] = useState<Door[]>([])
  const [companies, setCompanies] = useState<Company[]>([])
  const [callerRole, setCallerRole] = useState('')
  const [callerCompanyId, setCallerCompanyId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editUser, setEditUser] = useState<UserRow | null>(null)
  const [status, setStatus] = useState<'idle' | 'ok' | 'err'>('idle')
  const [statusMsg, setStatusMsg] = useState('')
  const [form, setForm] = useState({ email: '', password: '', full_name: '', role: 'guard', door_id: '', company_id: '', guard_company: '' })
  const [newPass, setNewPass] = useState('')
  const supabase = createClient()

  async function load() {
    setLoading(true)
    try {
      const resMe = await fetch('/api/users/me')
      const profile = await resMe.json()
      if (!profile) return
      setCallerRole(profile.role); setCallerCompanyId(profile.company_id)

      const resUsers = await fetch(`/api/users?company_id=${profile.role !== 'superadmin' ? profile.company_id : ''}`)
      setUsers(await resUsers.json())

      const resDoors = await fetch(`/api/doors?company_id=${profile.role !== 'superadmin' ? profile.company_id : ''}`)
      setDoors(await resDoors.json())

      if (profile.role === 'superadmin') {
        const resComps = await fetch('/api/companies')
        setCompanies(await resComps.json())
      }
    } catch (err) {
      console.error('Error cargando usuarios:', err)
    }
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  function toast(ok: boolean, msg: string) {
    setStatus(ok ? 'ok' : 'err'); setStatusMsg(msg)
    setTimeout(() => setStatus('idle'), 5000)
  }

  function startCreate() {
    setEditUser(null)
    setNewPass('')
    setForm({ email: '', password: '', full_name: '', role: 'guard', door_id: '', company_id: callerCompanyId || (companies.length > 0 ? companies[0].id : ''), guard_company: '' })
    setShowForm(true)
  }

  function startEdit(u: UserRow) {
    setEditUser(u)
    setNewPass('')
    setForm({ email: '', password: '', full_name: u.full_name, role: u.role, door_id: u.door_id || '', company_id: u.company_id || '', guard_company: u.guard_company || '' })
    setShowForm(true)
  }

  async function saveUser() {
    if (!form.full_name.trim()) { toast(false, 'El nombre es obligatorio'); return }
    setLoading(true)

    try {
      const method = editUser ? 'PUT' : 'POST'
      const payload = editUser 
        ? { id: editUser.id, full_name: form.full_name, role: form.role, door_id: form.door_id || null, guard_company: form.guard_company, company_id: form.company_id || null, password: newPass || undefined }
        : { ...form, company_id: form.company_id || callerCompanyId }

      const res = await fetch('/api/users', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!res.ok) throw new Error('Error al procesar usuario')

      toast(true, editUser ? '✅ Actualizado' : '✅ Creado')
      setShowForm(false)
      load()
    } catch (err: any) {
      toast(false, err.message)
    } finally {
      setLoading(false)
    }
  }

  async function toggleActive(id: string, active: boolean) {
    try {
      await fetch('/api/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, active: !active })
      })
      load()
    } catch (err) {}
  }

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Usuarios del Sistema</h1>
          <p className="text-slate-400 text-sm mt-1">{users.length} usuarios registrados</p>
        </div>
        <button onClick={startCreate} className="flex items-center gap-2 px-4 py-2.5 bg-[#00A9E0] hover:bg-[#00bfff] text-white rounded-xl text-sm font-semibold transition">
          <Plus className="w-4 h-4" /> Nuevo Usuario
        </button>
      </div>

      {status === 'ok' && <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-xl p-3 text-green-300 text-sm mb-4"><CheckCircle className="w-4 h-4" />{statusMsg}</div>}
      {status === 'err' && <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-red-300 text-sm mb-4"><AlertCircle className="w-4 h-4" />{statusMsg}</div>}

      {showForm && (
        <div className="bg-[#111e35] border border-[#00A9E0]/20 rounded-2xl p-6 mb-6 shadow-2xl animate-in fade-in zoom-in duration-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-semibold text-lg">{editUser ? `Editar Perfil: ${editUser.full_name}` : 'Crear Nuevo Usuario'}</h3>
            <button onClick={() => { setShowForm(false); setEditUser(null) }} className="p-1 hover:bg-white/10 rounded-lg transition"><X className="w-5 h-5 text-slate-400" /></button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-400 mb-1.5">Nombre Completo *</label>
              <input type="text" value={form.full_name} onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))} className={inputCls} placeholder="Ej: Rodrigo Silva" />
            </div>

            {editUser && (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-400 mb-1.5">Correo de Acceso (Usuario)</label>
                <input type="text" value={editUser.email} disabled className={`${inputCls} opacity-60 cursor-not-allowed`} />
                <p className="text-[10px] text-slate-500 mt-1">Este es el correo que el usuario debe ingresar para iniciar sesión.</p>
              </div>
            )}

            {!editUser ? (<>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1.5">Correo Electrónico *</label>
                <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className={inputCls} placeholder="correo@ejemplo.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1.5">Contraseña Inicial *</label>
                <input type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} className={inputCls} placeholder="••••••••" />
              </div>
            </>) : (
              <div className="md:col-span-2 bg-[#00A9E0]/5 border border-[#00A9E0]/20 rounded-xl p-4">
                <label className="block text-sm font-bold text-[#00A9E0] mb-1.5 flex items-center gap-2">🔑 Cambiar Contraseña (Opcional)</label>
                <input type="password" value={newPass} onChange={e => setNewPass(e.target.value)} className={`${inputCls} border-[#00A9E0]/40`} placeholder="Escribe aquí para resetear la clave" />
                <p className="text-[10px] text-slate-400 mt-2">Por seguridad, las contraseñas están encriptadas y no pueden visualizarse. Si el usuario la olvidó, escribe una nueva aquí para cambiarla.</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">Rol de Usuario</label>
              <select value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} className={inputCls}>
                <option value="guard">Guardia de Seguridad</option>
                <option value="admin">Administrador Local</option>
                {callerRole === 'superadmin' && <option value="superadmin">Super Admin</option>}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">Puerta de Control</label>
              <select value={form.door_id} onChange={e => setForm(f => ({ ...f, door_id: e.target.value }))} className={inputCls}>
                <option value="">Acceso General / Sin asignar</option>
                {doors.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#00A9E0] mb-1.5">Empresa de Seguridad (Empleador)</label>
              <input type="text" value={form.guard_company} onChange={e => setForm(f => ({ ...f, guard_company: e.target.value }))} className={inputCls} placeholder="Ej: Prosegur, Securitas..." />
            </div>

            {callerRole === 'superadmin' && (
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1.5">Empresa Cliente (Tenant)</label>
                <select value={form.company_id} onChange={e => setForm(f => ({ ...f, company_id: e.target.value }))} className={inputCls}>
                  <option value="">Sistema Global</option>
                  {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
            )}
          </div>

          <div className="flex gap-3 mt-8 pt-6 border-t border-slate-800">
            <button onClick={saveUser} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-3 bg-[#00A9E0] hover:bg-[#00bfff] text-white rounded-xl font-bold transition shadow-lg shadow-[#00A9E0]/20">
              <Save className="w-5 h-5" /> {editUser ? 'Actualizar Usuario' : 'Crear Usuario'}
            </button>
            <button onClick={() => { setShowForm(false); setEditUser(null) }} className="flex-1 md:flex-none px-8 py-3 bg-slate-800 text-slate-300 rounded-xl font-bold hover:bg-slate-700 transition">Cancelar</button>
          </div>
        </div>
      )}

      <div className="bg-[#111e35] border border-[#00A9E0]/15 rounded-2xl overflow-hidden shadow-xl">
        <div className="divide-y divide-slate-800">
          {users.map(u => {
            const RIcon = RoleIcons[u.role] || Users
            const badgeCls = roleBadge[u.role]
            return (
              <div key={u.id} className="px-6 py-5 flex items-center gap-4 hover:bg-white/2 transition-colors">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 border ${badgeCls.split(' ')[2]}`}>
                  <RIcon className={`w-6 h-6 ${badgeCls.split(' ')[1]}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold truncate text-lg">{u.full_name}</p>
                  <div className="flex items-center gap-3 mt-1 flex-wrap">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider border ${badgeCls}`}>{roleLabel[u.role]}</span>
                    {u.guard_company && <span className="text-slate-400 text-xs flex items-center gap-1"><Shield className="w-3 h-3 text-[#00A9E0]" /> {u.guard_company}</span>}
                    {u.doors && <span className="text-slate-500 text-xs flex items-center gap-1"><DoorOpen className="w-3 h-3" /> {(u.doors as any)?.name}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className={`text-[10px] font-bold px-2 py-1 rounded-lg ${u.active ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                    {u.active ? 'ACTIVO' : 'INACTIVO'}
                  </div>
                  <button onClick={() => startEdit(u)} className="p-2.5 rounded-xl text-slate-400 hover:text-[#00A9E0] hover:bg-[#00A9E0]/10 transition-all">
                    <Edit2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
