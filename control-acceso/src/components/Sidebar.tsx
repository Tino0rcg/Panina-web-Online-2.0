'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import {
  ScanLine, History, BarChart2, Users, Building2, PieChart,
  LogOut, Shield, DoorOpen, ChevronRight, Settings
} from 'lucide-react'

interface SidebarProps {
  role: string
  companyName: string
  userName: string
  logoUrl?: string | null
  guardCompany?: string | null
}

const navItems = {
  guard: [
    { href: '/dashboard/registro', icon: ScanLine, label: 'Registrar Ingreso' },
    { href: '/dashboard/salida', icon: DoorOpen, label: 'Registrar Salida' },
    { href: '/dashboard/hoy', icon: History, label: 'Visitas de Hoy' },
    { href: '/dashboard/reportes', icon: PieChart, label: 'Mis Reportes' },
  ],
  admin: [
    { href: '/dashboard/registro', icon: ScanLine, label: 'Registrar Ingreso' },
    { href: '/dashboard/salida', icon: DoorOpen, label: 'Registrar Salida' },
    { href: '/dashboard', icon: BarChart2, label: 'Dashboard' },
    { href: '/dashboard/historial', icon: History, label: 'Historial' },
    { href: '/dashboard/reportes', icon: PieChart, label: 'Reportes' },
    { href: '/dashboard/puertas', icon: Settings, label: 'Config. Puertas' },
    { href: '/dashboard/usuarios', icon: Users, label: 'Usuarios' },
  ],
  superadmin: [
    { href: '/dashboard', icon: BarChart2, label: 'Dashboard Global' },
    { href: '/dashboard/empresas', icon: Building2, label: 'Empresas' },
    { href: '/dashboard/puertas', icon: Settings, label: 'Config. Puertas' },
    { href: '/dashboard/registro', icon: ScanLine, label: 'Registrar Ingreso' },
    { href: '/dashboard/salida', icon: DoorOpen, label: 'Registrar Salida' },
    { href: '/dashboard/historial', icon: History, label: 'Historial' },
    { href: '/dashboard/reportes', icon: PieChart, label: 'Reportes' },
    { href: '/dashboard/usuarios', icon: Users, label: 'Usuarios' },
  ],
}

export default function Sidebar({ role, companyName, userName, logoUrl, guardCompany }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const items = navItems[role as keyof typeof navItems] || navItems.guard

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    window.location.href = '/'
  }

  return (
    <aside className="w-64 h-full bg-[#0d1f3a] border-r border-[#00A9E0]/10 flex flex-col flex-shrink-0">
      {/* Logo */}
      <div className="p-6 border-b border-[#00A9E0]/10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#00A9E0]/5 flex items-center justify-center border border-[#00A9E0]/20 overflow-hidden shadow-inner">
            {logoUrl ? (
              <img src={logoUrl} alt="Logo" className="w-full h-full object-contain p-1.5" />
            ) : (
              <Shield className="w-6 h-6 text-[#00A9E0]" />
            )}
          </div>
          <div className="min-w-0">
            <p className="text-white font-bold text-sm leading-tight truncate">{companyName}</p>
            <p className="text-[#00A9E0] text-[10px] font-bold uppercase tracking-wider">Sistema de Control</p>
          </div>
        </div>
      </div>

      {/* Info usuario */}
      <div className="px-5 py-4 border-b border-[#00A9E0]/10 bg-white/2">
        <div className="flex flex-col gap-1">
          <p className="text-white font-semibold text-sm truncate">{userName}</p>
          {guardCompany && (
            <p className="text-slate-400 text-[10px] italic mb-1 truncate -mt-0.5">{guardCompany}</p>
          )}
          <span className="inline-block w-fit px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#00A9E0]/20 text-[#00A9E0] border border-[#00A9E0]/30 uppercase tracking-tighter">
            {role === 'superadmin' ? 'Super Admin' : role === 'admin' ? 'Administrador' : 'Guardia'}
          </span>
        </div>
      </div>

      {/* Navegación */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto custom-scrollbar">
        {items.map(({ href, icon: Icon, label }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group
                ${active
                  ? 'bg-[#00A9E0] text-white shadow-lg shadow-[#00A9E0]/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
            >
              <Icon className={`w-4 h-4 flex-shrink-0 ${active ? 'text-white' : 'group-hover:text-[#00A9E0]'}`} />
              <span className="flex-1">{label}</span>
              {active && <div className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-[#00A9E0]/10 bg-[#0a1628]/50">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-red-400 border border-red-500/20 bg-red-500/5 hover:bg-red-500/20 transition-all shadow-lg active:scale-95"
        >
          <LogOut className="w-4 h-4" />
          Cerrar sesión segura
        </button>
      </div>
    </aside>
  )
}
