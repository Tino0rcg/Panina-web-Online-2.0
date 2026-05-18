import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/db'
import Sidebar from '@/components/Sidebar'
import RemoteScanListener from '@/components/RemoteScanListener'

export const dynamic = 'force-dynamic'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('session')
  
  if (!sessionCookie) redirect('/')
  
  const user = JSON.parse(sessionCookie.value)

  let profile: any = null;
  
  if (user.id === 'admin-local-id') {
    redirect('/')
  } else {
    // Obtener perfil y empresa desde Prisma
    profile = await prisma.userProfile.findUnique({
      where: { id: user.id },
      include: { company: true }
    })
  }

  if (!profile) redirect('/')

  let role = profile.role
  let userName = profile.full_name
  let companyName = profile.company?.name
  let logoUrl = profile.company?.logo_url

  // Si es Super Admin y no tiene empresa asignada, buscamos la primera empresa del sistema para el branding
  if (role === 'superadmin' && !companyName) {
    const firstCompany = await prisma.company.findFirst({
      orderBy: { created_at: 'asc' }
    })
    
    if (firstCompany) {
      companyName = firstCompany.name
      logoUrl = firstCompany.logo_url
    }
  }

  // Valores finales con fallback
  companyName = companyName || 'Control de Acceso'
  logoUrl = logoUrl || null

  return (
    <div className="flex h-screen overflow-hidden bg-[#0a1628]">
      <RemoteScanListener />
      <Sidebar 
        role={role} 
        companyName={companyName} 
        userName={userName} 
        logoUrl={logoUrl} 
        guardCompany={profile.guard_company} 
      />
      <main className="flex-1 overflow-y-auto relative h-full">
        {children}
      </main>
    </div>
  )
}
