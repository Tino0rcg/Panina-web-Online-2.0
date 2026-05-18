import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { visit_id } = await req.json()
    const visit = await prisma.visit.update({
      where: { id: visit_id },
      data: { exit_time: new Date() }
    })
    return NextResponse.json(visit)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
