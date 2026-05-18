import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { createClient as createAdminClient } from '@supabase/supabase-js'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

    const { data: callerProfile } = await supabase
      .from('user_profiles').select('role').eq('id', user.id).single()
    if (!['admin', 'superadmin'].includes(callerProfile?.role || ''))
      return NextResponse.json({ error: 'Sin permisos' }, { status: 403 })

    const { email, password, full_name, role, door_id, company_id } = await request.json()

    // Admin client con service_role para crear usuarios
    const adminSupabase = createAdminClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { data: newUser, error: authError } = await adminSupabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    })

    if (authError) return NextResponse.json({ error: authError.message }, { status: 400 })

    const { error: profileError } = await adminSupabase.from('user_profiles').insert({
      id: newUser.user.id,
      company_id: company_id || null,
      role,
      full_name,
      door_id: door_id || null,
      active: true,
    })

    if (profileError) return NextResponse.json({ error: profileError.message }, { status: 400 })

    return NextResponse.json({ success: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
