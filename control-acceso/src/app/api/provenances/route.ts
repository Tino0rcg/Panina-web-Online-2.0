import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

// Procedencias predeterminadas del sistema
const DEFAULT_PROVENANCES = [
  'Seguridad',
  'Jardines',
  'Aseo',
  'Redes',
  'Eléctrico',
  'Obras Civiles',
  'Limpieza',
]

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const company_id = searchParams.get('company_id')

    const where = company_id ? { company_id, active: true } : { active: true }
    const dbProvenances = await prisma.provenance.findMany({
      where,
      orderBy: { name: 'asc' }
    })

    // Combinar las predeterminadas con las de la BD (sin duplicados)
    const dbNames = dbProvenances.map(p => p.name)
    const merged = [
      ...DEFAULT_PROVENANCES.map(name => ({ id: null, name, isDefault: true })),
      ...dbProvenances
        .filter(p => !DEFAULT_PROVENANCES.includes(p.name))
        .map(p => ({ id: p.id, name: p.name, isDefault: false }))
    ]

    return NextResponse.json(merged)
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener procedencias' }, { status: 500 })
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
