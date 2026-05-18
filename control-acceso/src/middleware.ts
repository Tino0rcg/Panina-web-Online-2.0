import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Desactivado temporalmente para permitir entrada directa
  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/dashboard/:path*'],
}
