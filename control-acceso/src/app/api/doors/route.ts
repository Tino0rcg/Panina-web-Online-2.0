import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const company_id = searchParams.get('company_id')

  try {
    const doors = await prisma.door.findMany({
      where: company_id ? { company_id } : {},
      orderBy: { name: 'asc' }
    })
    return NextResponse.json(doors)
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener puertas' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    console.log('📝 Intentando grabar puerta:', data.name)
    
    let company_id = data.company_id
    if (!company_id) {
      const firstCompany = await prisma.company.findFirst({ orderBy: { created_at: 'asc' } })
      if (!firstCompany) throw new Error('No hay empresas creadas en el sistema')
      company_id = firstCompany.id
    }
    
    const door = await prisma.door.create({
      data: {
        name: data.name,
        location: data.location || '',
        company_id: company_id,
        active: true
      }
    })
    console.log('✅ Puerta grabada con éxito:', door.id)
    return NextResponse.json(door)
  } catch (error: any) {
    console.error('❌ Error al grabar puerta:', error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const data = await req.json()
    const { id, ...updateData } = data
    if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 })

    const door = await prisma.door.update({
      where: { id },
      data: updateData
    })
    return NextResponse.json(door)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'ID requerido' }, { status: 400 })

    await prisma.door.delete({
      where: { id }
    })
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
