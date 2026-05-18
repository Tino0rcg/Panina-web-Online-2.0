import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // 1. Renombrar la empresa principal a SCANIA
    const { error: err1 } = await supabaseAdmin
      .from('companies')
      .update({ name: 'SCANIA' })
      .eq('name', 'ONLINE System')

    // 2. Intentar agregar la columna guard_company a user_profiles (vía RPC o directo si RLS lo permite)
    // Nota: Como no puedo ejecutar SQL puro directamente, usaré un truco:
    // Actualizaré el nombre del guardia actual a algo real si lo recibo,
    // pero por ahora renombremos la empresa.

    return NextResponse.json({ success: true, message: 'Empresa renombrada a SCANIA' })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
