import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { person_id, is_conflictive, notes } = await req.json()
    const person = await prisma.person.update({
      where: { id: person_id },
      data: { 
        is_conflictive,
        conflict_notes: notes || null
      }
    })
    console.log(`⚠️ [PERSONA] Marcada como conflictiva (${is_conflictive}):`, person_id)
    return NextResponse.json(person)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
