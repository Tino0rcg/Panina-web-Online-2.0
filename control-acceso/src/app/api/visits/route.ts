export const dynamic = 'force-dynamic'
export const revalidate = 0

import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const company_id = searchParams.get('company_id')
  const page = parseInt(searchParams.get('page') || '0')
  const limit = parseInt(searchParams.get('limit') || '25')
  const dateFrom = searchParams.get('dateFrom')
  const dateTo = searchParams.get('dateTo')
  const area = searchParams.get('area')
  const door_id = searchParams.get('door_id')
  const query = searchParams.get('query')

  try {
    const where: any = { is_active: true }
    if (company_id) where.company_id = company_id
    if (door_id) where.door_id = door_id
    if (area) where.area = { contains: area }
    
    if (dateFrom || dateTo) {
      where.entry_time = {}
      if (dateFrom) where.entry_time.gte = new Date(dateFrom)
      if (dateTo) {
        const dTo = new Date(dateTo)
        dTo.setHours(23, 59, 59, 999)
        where.entry_time.lte = dTo
      }
    }

    if (query) {
      where.OR = [
        { person: { full_name: { contains: query } } },
        { person: { rut: { contains: query } } },
        { area: { contains: query } },
        { reason: { contains: query } },
        { visited_person: { contains: query } }
      ]
    }

    const [visits, total] = await Promise.all([
      prisma.visit.findMany({
        where,
        include: {
          person: true,
          door: true,
          guard: { select: { full_name: true } }
        },
        orderBy: { entry_time: 'desc' },
        skip: page * limit,
        take: limit
      }),
      prisma.visit.count({ where })
    ])

    if (visits.length > 0) {
      console.log(`🔍 [API] Enviando ${visits.length} visitas. Primera: ${visits[0].person?.full_name}, Conflictivo: ${visits[0].person?.is_conflictive}`)
    }
    return NextResponse.json({ visits, total })
  } catch (error: any) {
    console.error('Error al obtener visitas:', error.message)
    return NextResponse.json({ error: 'Error al obtener visitas' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    console.log('📝 [VISITA] Datos recibidos:', JSON.stringify(data).substring(0, 200))

    // --- Resolver guard_id desde la sesión si no viene en los datos ---
    let guard_id = data.guard_id || null
    if (!guard_id || guard_id === 'admin-local-id') {
      // Leer la cookie de sesión del request
      const cookieHeader = req.headers.get('cookie') || ''
      const sessionMatch = cookieHeader.match(/session=([^;]+)/)
      if (sessionMatch) {
        try {
          const sessionData = JSON.parse(decodeURIComponent(sessionMatch[1]))
          if (sessionData.id && sessionData.id !== 'admin-local-id') {
            guard_id = sessionData.id
          }
        } catch {}
      }
    }

    // Si aún no hay guard_id válido, usar el primer superadmin disponible
    if (!guard_id || guard_id === 'admin-local-id') {
      const fallbackGuard = await prisma.userProfile.findFirst({
        where: { role: 'superadmin', active: true }
      })
      guard_id = fallbackGuard?.id || null
      if (guard_id) console.log('⚠️ [VISITA] Usando guardia fallback:', fallbackGuard?.full_name)
    }

    // --- Resolver company_id ---
    let company_id = data.company_id || null
    if (!company_id || company_id === 'scania-chile-id') {
      const firstCompany = await prisma.company.findFirst({ orderBy: { created_at: 'asc' } })
      company_id = firstCompany?.id || null
    }

    // --- Resolver door_id ---
    let door_id = data.door_id || null
    if (!door_id) {
      const firstDoor = await prisma.door.findFirst({
        where: company_id ? { company_id } : {},
        orderBy: { created_at: 'asc' }
      })
      door_id = firstDoor?.id || null
    }

    if (!company_id) throw new Error('No hay empresa configurada en el sistema.')
    if (!door_id) throw new Error('No hay puertas configuradas. Crea una puerta primero.')

    // --- 1. Gestionar Persona (Visitante) ---
    let person = await prisma.person.findUnique({ where: { rut: data.rut } })
    if (!person) {
      person = await prisma.person.create({
        data: {
          rut: data.rut,
          full_name: data.full_name || data.rut,
          birth_date: data.birth_date || null,
          sex: data.sex || null,
          last_visitor_company: data.visitor_company || null
        }
      })
    } else {
      // Actualizar datos si cambiaron
      const updateData: any = {}
      if (data.full_name && data.full_name !== person.full_name) updateData.full_name = data.full_name
      if (data.visitor_company) updateData.last_visitor_company = data.visitor_company
      
      if (Object.keys(updateData).length > 0) {
        await prisma.person.update({ where: { id: person.id }, data: updateData })
      }
    }

    // --- 2. Crear Registro de Visita ---
    const visit = await prisma.visit.create({
      data: {
        company_id,
        door_id,
        person_id: person.id,
        guard_id,
        visited_person: data.visited_person || 'No especificado',
        area: data.area || 'No especificado',
        reason: data.reason || 'No especificado',
        visitor_company: data.visitor_company || null,
        vehicle_plate: data.vehicle_plate || null,
        photo_url: data.photo_url || null,
        notes: data.notes || null,
        visitor_type: data.visitor_type || null,
        provenance: data.provenance || null
      }
    })

    console.log('✅ [VISITA] Registrada:', visit.id)
    return NextResponse.json(visit)
  } catch (error: any) {
    console.error('❌ [VISITA] Error:', error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
