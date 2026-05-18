import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const company_id = searchParams.get('company_id')
  
  try {
    const users = await prisma.userProfile.findMany({
      where: company_id ? { company_id } : {},
      include: { company: true, door: true },
      orderBy: { full_name: 'asc' }
    })
    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener usuarios' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    
    let company_id = data.company_id
    if (!company_id && data.role !== 'superadmin') {
      const firstCompany = await prisma.company.findFirst({ orderBy: { created_at: 'asc' } })
      if (firstCompany) company_id = firstCompany.id
    }

    const user = await prisma.userProfile.create({
      data: {
        email: data.email,
        password: data.password,
        full_name: data.full_name,
        role: data.role,
        company_id: company_id || null,
        door_id: data.door_id || null,
        guard_company: data.guard_company || null,
        active: true
      }
    })
    return NextResponse.json(user)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const data = await req.json()
    const { id, ...updateData } = data
    const user = await prisma.userProfile.update({
      where: { id },
      data: updateData
    })
    return NextResponse.json(user)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 })

    await prisma.userProfile.delete({
      where: { id }
    })
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
