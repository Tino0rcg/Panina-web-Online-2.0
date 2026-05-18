import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(req: Request) {
  try {
    let email = '';
    let password = '';
    const contentType = req.headers.get('content-type') || '';
    
    if (contentType.includes('application/json')) {
      const body = await req.json();
      email = body.email;
      password = body.password;
    } else {
      const formData = await req.formData();
      email = formData.get('email') as string;
      password = formData.get('password') as string;
    }
    console.log('🔑 Intento de acceso para:', email)

    const host = req.headers.get('host') || '192.168.100.90:3000';
    const protocol = req.headers.get('x-forwarded-proto') || (req.url.startsWith('https') ? 'https' : 'http');
    const baseUrl = `${protocol}://${host}`;

    console.log('💾 Consultando base de datos para usuarios...')
    const user = await prisma.userProfile.findUnique({
      where: { email },
      include: { company: true }
    })

    if (!user || user.password !== password) {
      console.log('❌ Credenciales incorrectas')
      if (!contentType.includes('application/json')) {
        return NextResponse.redirect(`${baseUrl}/?error=Credenciales%20inválidas`)
      }
      return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 })
    }

    console.log('✅ Usuario validado:', user.full_name)

    const sessionData = {
      id: user.id,
      email: user.email,
      role: user.role,
      fullName: user.full_name,
      companyId: user.company_id
    }

    console.log('🍪 Configurando cookies...')
    const cookieStore = await cookies()
    cookieStore.set('session', JSON.stringify(sessionData), {
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
      sameSite: 'lax'
    })

    console.log('🚀 Login exitoso, enviando respuesta')
    if (!contentType.includes('application/json')) {
      return NextResponse.redirect(`${baseUrl}/dashboard`)
    }
    return NextResponse.json({ success: true, user: sessionData })
  } catch (error: any) {
    console.error('🔥 Error crítico en login:', error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
