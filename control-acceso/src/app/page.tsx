'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Shield, Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      
      const data = await res.json()
      
      if (!res.ok) {
        setError(data.error || 'Credenciales incorrectas.')
        setLoading(false)
      } else {
        router.push('/dashboard')
      }
    } catch (err) {
      setError('Error de conexión con el servidor local.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a1628] flex items-center justify-center p-4">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#00A9E0]/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#00A9E0]/20 border border-[#00A9E0]/30 mb-4">
            <Shield className="w-8 h-8 text-[#00A9E0]" />
          </div>
          <h1 className="text-2xl font-bold text-white">Control de Acceso</h1>
          <p className="text-sm text-slate-400 mt-1">ONLINE System — Acceso seguro</p>
        </div>

        {/* Formulario Estándar */}
        <div className="bg-[#111e35] border border-[#00A9E0]/15 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleLogin} action="/api/auth/login" method="POST" className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Correo electrónico
              </label>
              <input
                type="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="usuario@empresa.cl"
                className="w-full bg-[#0a1628] border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-[#00A9E0] focus:ring-1 focus:ring-[#00A9E0] transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  name="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#0a1628] border border-slate-700 rounded-xl px-4 py-3 pr-12 text-white placeholder-slate-500 focus:outline-none focus:border-[#00A9E0] focus:ring-1 focus:ring-[#00A9E0] transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition"
                >
                  {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-sm text-red-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-[#00A9E0] text-white rounded-xl font-bold shadow-lg hover:bg-[#0072BC] transition active:scale-95"
            >
              INGRESAR AL SISTEMA (SCANIA)
            </button>
          </form>

        </div>

        <p className="text-center text-xs text-slate-500 mt-6">
          © 2025 ONLINE System · Control de Acceso v1.0
        </p>
      </div>
    </div>
  )
}
