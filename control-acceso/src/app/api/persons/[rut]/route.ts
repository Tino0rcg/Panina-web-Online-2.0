export const dynamic = 'force-dynamic'
export const revalidate = 0

import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(req: Request, { params }: { params: Promise<{ rut: string }> }) {
  try {
    const { rut } = await params
    const person = await prisma.person.findUnique({
      where: { rut: rut },
      include: {
        visits: {
          orderBy: { entry_time: 'desc' },
          take: 1
        }
      }
    })

    if (!person) {
      return NextResponse.json({ error: 'Persona no encontrada' }, { status: 404 })
    }

    const lastVisit = person.visits[0]
    const hasActiveVisit = lastVisit ? lastVisit.exit_time === null : false

    return NextResponse.json({
      ...person,
      last_visited_person: lastVisit?.visited_person,
      last_area: lastVisit?.area,
      has_active_visit: hasActiveVisit
    })
  } catch (error) {
    return NextResponse.json({ error: 'Error al buscar persona' }, { status: 500 })
  }
}
