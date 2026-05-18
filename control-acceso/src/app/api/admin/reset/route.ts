import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    // Usamos las variables de entorno para crear un cliente con privilegios de sistema
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY! // Esta clave ignora RLS
    )

    // Verificar que quien llama sea Super Admin
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    
    // Obtener el ID del usuario que solicita el reset
    const { data: { user }, error: authErr } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''))
    if (authErr || !user) return NextResponse.json({ error: 'Sesión inválida' }, { status: 401 })

    const { data: profile } = await supabase.from('user_profiles').select('role').eq('id', user.id).single()
    if (profile?.role !== 'superadmin') {
      return NextResponse.json({ error: 'No tienes permisos de Super Admin' }, { status: 403 })
    }

    console.log('Iniciando Reset Total del Sistema...')

    // 1. Borrar Visitas
    await supabase.from('visits').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    
    // 2. Borrar Puertas
    await supabase.from('doors').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    
    // 3. Borrar Personas
    await supabase.from('persons').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    
    // 4. Borrar Perfiles (excepto superadmins)
    await supabase.from('user_profiles').delete().neq('role', 'superadmin')
    
    // 5. Borrar Empresas
    await supabase.from('companies').delete().neq('id', '00000000-0000-0000-0000-000000000000')

    return NextResponse.json({ success: true, message: 'Sistema reseteado correctamente' })

  } catch (error: any) {
    console.error('Error en API Reset:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
