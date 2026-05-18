import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function PATCH(req: Request) {
  try {
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const authHeader = req.headers.get('Authorization')
    if (!authHeader) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    
    // 1. Validar que quien pide el cambio es un Super Admin
    const token = authHeader.replace('Bearer ', '')
    const { data: { user: requester }, error: authErr } = await supabaseAdmin.auth.getUser(token)
    
    if (authErr || !requester) return NextResponse.json({ error: 'Sesión inválida' }, { status: 401 })

    const { data: profile } = await supabaseAdmin.from('user_profiles').select('role').eq('id', requester.id).single()
    if (profile?.role !== 'superadmin') {
      return NextResponse.json({ error: 'Permisos insuficientes' }, { status: 403 })
    }

    // 2. Obtener datos del cambio
    const { userId, newPassword } = await req.json()
    if (!userId || !newPassword) return NextResponse.json({ error: 'Faltan datos' }, { status: 400 })

    // 3. Ejecutar el cambio de contraseña (ADMIN API)
    const { error: updateErr } = await supabaseAdmin.auth.admin.updateUserById(userId, {
      password: newPassword
    })

    if (updateErr) throw updateErr

    return NextResponse.json({ success: true })

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
