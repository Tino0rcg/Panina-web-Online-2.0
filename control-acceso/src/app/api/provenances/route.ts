import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

const DEFAULT_PROVENANCES = [
  'Seguridad', 'Jardines', 'Aseo', 'Redes',
  'Eléctrico', 'Obras Civiles', 'Limpieza',
]

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const company_id = searchParams.get('company_id')

    let dbProvenances: { id: string; name: string }[] = []
    try {
      const where = company_id ? { company_id, active: true } : { active: true }
      dbProvenances = await prisma.provenance.findMany({ where, orderBy: { name: 'asc' } })
    } catch (dbErr) {
      // La tabla puede no existir aún si la migración no se ejecutó todavía
      console.warn('[provenances] DB query failed, using defaults only:', dbErr)
    }

    // Unir defaults + personalizadas (sin duplicados)
    const customNames = dbProvenances.map(p => p.name)
    const merged = [
      ...DEFAULT_PROVENANCES.map(name => ({ id: null, name })),
      ...dbProvenances
        .filter(p => !DEFAULT_PROVENANCES.includes(p.name))
        .map(p => ({ id: p.id, name: p.name }))
    ]

    return NextResponse.json(merged)
  } catch (error) {
    // En caso de error total, devolver siempre un array con los defaults
    return NextResponse.json(
      DEFAULT_PROVENANCES.map(name => ({ id: null, name }))
    )
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const name = data.name?.trim()
    if (!name) return NextResponse.json({ error: 'Nombre requerido' }, { status: 400 })

    // Si es una procedencia predeterminada no la guardamos en BD
    if (DEFAULT_PROVENANCES.includes(name)) {
      return NextResponse.json({ id: null, name, isDefault: true })
    }

    // Resolver company_id
    let company_id = data.company_id
    if (!company_id) {
      const firstCompany = await prisma.company.findFirst({ orderBy: { created_at: 'asc' } })
      company_id = firstCompany?.id
    }
    if (!company_id) return NextResponse.json({ error: 'No hay empresa configurada' }, { status: 400 })

    // Crear o recuperar si ya existe
    const existing = await prisma.provenance.findUnique({ where: { name } })
    if (existing) return NextResponse.json({ id: existing.id, name: existing.name, isDefault: false })

    const created = await prisma.provenance.create({
      data: { name, company_id }
    })
    return NextResponse.json({ id: created.id, name: created.name, isDefault: false })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
