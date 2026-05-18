export const dynamic = 'force-dynamic'
export const revalidate = 0

import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const data = await req.json()
    
    let person = await prisma.person.findUnique({
      where: { rut: data.rut }
    })

    if (!person) {
      person = await prisma.person.create({
        data: {
          rut: data.rut,
          full_name: data.full_name,
          birth_date: data.birth_date,
          sex: data.sex,
          last_visitor_company: data.visitor_company
        }
      })
    } else {
      person = await prisma.person.update({
        where: { id: person.id },
        data: { 
          full_name: data.full_name,
          birth_date: data.birth_date || person.birth_date,
          sex: data.sex || person.sex,
          last_visitor_company: data.visitor_company || person.last_visitor_company
        }
      })
    }

    return NextResponse.json(person)
  } catch (error: any) {
    console.error('Error guardando persona:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
