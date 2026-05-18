import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const cookieStore = await cookies()
  const session = cookieStore.get('session')
  
  if (!session) {
    return NextResponse.json({ error: 'No session' }, { status: 401 })
  }

  try {
    const user = JSON.parse(session.value)
    if (user.id === 'admin-local-id') {
      return NextResponse.json({ error: 'Session expired' }, { status: 401 })
    }
    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error: 'Invalid session' }, { status: 401 })
  }
}
