import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const companies = await prisma.company.findMany({
      include: {
        doors: true,
        users: {
          select: { id: true, full_name: true, role: true, active: true }
        }
      },
      orderBy: { name: 'asc' }
    })
    return NextResponse.json(companies)
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener empresas' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const company = await prisma.company.create({
      data: {
        name: data.name,
        rut: data.rut,
        address: data.address,
        phone: data.phone,
        logo_url: data.logo_url,
        active: true
      }
    })
    return NextResponse.json(company)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const data = await req.json()
    const { id, ...updateData } = data
    const company = await prisma.company.update({
      where: { id },
      data: updateData
    })
    return NextResponse.json(company)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 })

    await prisma.company.delete({
      where: { id }
    })
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
