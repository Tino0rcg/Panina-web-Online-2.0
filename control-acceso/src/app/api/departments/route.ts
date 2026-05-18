import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const company_id = searchParams.get('company_id')
    
    const where = company_id ? { company_id } : {}
    const depts = await prisma.department.findMany({
      where,
      orderBy: { name: 'asc' }
    })
    return NextResponse.json(depts)
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener departamentos' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const dept = await prisma.department.create({
      data: {
        name: data.name.toUpperCase().trim(),
        company_id: data.company_id
      }
    })
    return NextResponse.json(dept)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
