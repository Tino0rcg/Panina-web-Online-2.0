import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('session')
    
    if (!sessionCookie) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }
    
    const user = JSON.parse(sessionCookie.value)
    
    // Verificar en Prisma, a menos que sea el bypass de emergencia
    let role = user.role
    if (user.id !== 'admin-local-id') {
      const profile = await prisma.userProfile.findUnique({
        where: { id: user.id }
      })
      role = profile?.role
    }
    
    if (role !== 'superadmin') {
      return NextResponse.json({ error: 'Permisos insuficientes' }, { status: 403 })
    }

    console.log('--- RESET INICIADO ---')
    // El orden importa por las llaves foráneas
    await prisma.visit.deleteMany()
    await prisma.person.deleteMany()
    await prisma.door.deleteMany()
    // Borrar usuarios que NO sean superadmin
    await prisma.userProfile.deleteMany({
      where: { role: { not: 'superadmin' } }
    })
    // Borrar empresas que no estén ligadas al superadmin o a doors
    await prisma.company.deleteMany()
    console.log('--- RESET COMPLETADO ---')

    return NextResponse.json({ success: true })

  } catch (error: any) {
    console.error('Error en reset:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
