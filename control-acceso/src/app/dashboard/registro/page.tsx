'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ScanLine, Clock, User, Building2, MapPin, FileText, CheckCircle, Search, Camera, Keyboard, UserCheck, AlertCircle, DoorOpen, Users, Truck, Plus } from 'lucide-react'

interface PersonData { rut: string; full_name: string; birth_date?: string; sex?: string }
interface Door { id: string; name: string; company_id: string }
interface UserProfile { id: string; company_id: string; door_id: string | null; role: string }

import { Suspense } from 'react'

function RegistroContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [mode, setMode] = useState<'scan' | 'manual'>('scan')
  const [rawScan, setRawScan] = useState('')
  const [person, setPerson] = useState<PersonData | null>(null)
  const [rut, setRut] = useState('')
  
  // Capturar datos del escaneo remoto desde la URL
  useEffect(() => {
    const scanData = searchParams.get('scan')
    if (scanData) {
      // Caso A: Formato PDF417 (Reverso) - Contiene RUT@PATERNO@MATERNO@NOMBRES...
      if (scanData.includes('@')) {
        const parts = scanData.split('@')
        if (parts.length >= 4) {
          const rawRut = parts[0].replace(/^0+/, '')
          const fullName = `${parts[3]} ${parts[1]} ${parts[2]}`.trim()
          const sex = parts[4] || ''
          const rawBirth = parts[5] || '' // Suele venir como DDMMYYYY o similar
          
          setRut(rawRut)
          setManualRut(rawRut)
          setManualName(fullName)
          setManualSex(sex)
          
          // Intentar formatear fecha (ej: 01011990 -> 1990-01-01)
          if (rawBirth.length === 8) {
             const formattedBirth = `${rawBirth.substring(4, 8)}-${rawBirth.substring(2, 4)}-${rawBirth.substring(0, 2)}`
             setManualBirth(formattedBirth)
          }
          
          setMode('manual')
          return
        }
      }

      // Caso B: URL o Código Simple (Solo RUT)
      let finalRut = ''
      const rutRegex = /(\d{1,2}\.?\d{3}\.?\d{3}-?[\dkK])/i
      
      if (scanData.includes('http')) {
        try {
          const url = new URL(scanData)
          // buscar run o RUN en mayúsculas
          finalRut = url.searchParams.get('rut') || url.searchParams.get('run') || url.searchParams.get('RUN') || ''
        } catch(e) {}
        
        if (!finalRut) {
          const m = scanData.match(rutRegex)
          if (m) finalRut = m[0]
        }
      } else {
        const m = scanData.match(rutRegex)
        finalRut = m ? m[0] : scanData
      }

      const cleanRut = finalRut.replace(/\./g, '').trim()
      if (cleanRut && cleanRut.length >= 7) {
        setRut(cleanRut)
        setManualRut(cleanRut)
        setMode('manual')
      }
    }
  }, [searchParams])

  const [manualRut, setManualRut] = useState('')
  const [manualName, setManualName] = useState('')
  const [manualBirth, setManualBirth] = useState('')
  const [manualSex, setManualSex] = useState('')
  const [isConflictive, setIsConflictive] = useState(false)
  const [conflictNotes, setConflictNotes] = useState('')
  const [doors, setDoors] = useState<Door[]>([])
  const [departments, setDepartments] = useState<{id: string, name: string}[]>([])
  const [provenances, setProvenances] = useState<{id: string|null, name: string}[]>([])
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [form, setForm] = useState({ door_id: '', visited_person: '', area: '', reason: '', visitor_company: '', vehicle_plate: '', notes: '' })
  const [visitorType, setVisitorType] = useState<'INTERNO' | 'EXTERNO' | ''>('')
  const [provenance, setProvenance] = useState('')
  const [newProvenance, setNewProvenance] = useState('')
  const [showNewProvenance, setShowNewProvenance] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [statusMsg, setStatusMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const scanRef = useRef<HTMLInputElement>(null)

  const loadProfile = useCallback(async () => {
    try {
      // Cargamos el perfil desde la sesión de la cookie (vía una pequeña API de ayuda o directamente si es posible)
      const res = await fetch('/api/users/me')
      const p = await res.json()
      if (p) {
        setProfile(p)
        
        const [resDoors, resDepts, resProv] = await Promise.all([
          fetch(`/api/doors?company_id=${p.company_id || ''}`),
          fetch(`/api/departments?company_id=${p.company_id || ''}`),
          fetch(`/api/provenances?company_id=${p.company_id || ''}`)
        ])
        
        const availableDoors = await resDoors.json()
        setDoors(availableDoors)
        setDepartments(await resDepts.json())
        setProvenances(await resProv.json())

        if (p.door_id) {
          setForm(f => ({ ...f, door_id: p.door_id! }))
        } else if (availableDoors.length > 0) {
          setForm(f => ({ ...f, door_id: availableDoors[0].id }))
        }
      }
    } catch (err) {
      console.error('Error cargando perfil:', err)
    }
  }, [])

  useEffect(() => { loadProfile(); scanRef.current?.focus() }, [loadProfile])

  function parseCedula(raw: string): PersonData | null {
    try {
      console.log('🔍 [SCAN] Crudo:', raw)
      const cleanRaw = raw.trim()
      
      // 1. Formato PDF417 (Trasero): RUT@PATERNO@MATERNO@NOMBRES...
      if (cleanRaw.includes('@')) {
        const parts = cleanRaw.split('@').filter(val => val !== undefined)
        if (parts.length >= 4) {
          return {
            rut: parts[0]?.trim() || '',
            full_name: `${parts[3]?.trim()} ${parts[1]?.trim()} ${parts[2]?.trim()}`.trim(),
            sex: parts[4]?.trim() || '',
            birth_date: parts[5]?.trim() || '',
          }
        }
      }
      
      // 2. Formato QR (Frontal) o Escaneo Simple: Buscar cualquier RUT en el texto
      const rutRegex = /(\d{1,2}\.?\d{3}\.?\d{3}-?[\dkK])/
      const match = cleanRaw.match(rutRegex)
      if (match) {
        return { 
          rut: match[0].replace(/\./g, ''), // Limpiar puntos para consistencia
          full_name: '' 
        }
      }
      
      return null
    } catch { return null }
  }

  async function testConnection() {
    try {
      const res = await fetch('/api/remote-scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rut: 'TEST-123', full_name: 'CONEXIÓN EXITOSA', timestamp: Date.now() })
      })
      if (res.ok) alert("✅ Conexión con PC establecida correctamente.")
      else alert("❌ El PC recibió la señal pero hubo un error.")
    } catch (err) {
      alert("❌ No se pudo contactar al PC. Verifica que el celular esté en el mismo Wi-Fi que el computador.")
    }
  }

  async function onScan(raw: string) {
    const parsed = parseCedula(raw)
    if (parsed) { 
      // Verificar estado en la BD antes de permitir el ingreso
      try {
        const res = await fetch(`/api/persons/${parsed.rut}?t=${Date.now()}`, { cache: 'no-store' })
        const p = await res.json()
        if (p && !p.error) {
          if (p.is_conflictive) {
            setMode('manual')
            setManualRut(parsed.rut)
            setManualName(p.full_name || parsed.full_name)
            setIsConflictive(true)
            setConflictNotes(p.conflict_notes || 'Persona marcada como conflictiva')
            setStatus('error')
            setStatusMsg('Acceso bloqueado: Visitante conflictivo.')
            return // Detiene el flujo
          }
          if (p.has_active_visit) {
            setMode('manual')
            setManualRut(parsed.rut)
            setManualName(p.full_name || parsed.full_name)
            setHasActiveVisit(true)
            setStatus('error')
            setStatusMsg(`El RUT ${parsed.rut} ya registra un Ingreso.`)
            return // Detiene el flujo
          }
        }
      } catch (err) {}

      setPerson(parsed)
      setStatus('idle') 
      
      // Enviar al PC con manejo de errores visible (útil si están usando la web en un tablet remoto)
      try {
        const res = await fetch('/api/remote-scan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(parsed)
        })
        if (!res.ok) console.error('Error en puente')
      } catch (err) {
        alert("⚠️ Error: El celular no pudo enviar los datos al PC. Revisa la conexión Wi-Fi.")
      }
    } else { 
      setStatus('error')
      setStatusMsg('No se pudo leer la cédula. Use el modo manual.') 
    }
  }


  function handleScanInput(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      onScan(rawScan)
      setRawScan('')
    }
  }

  function handleManualConfirm() {
    if (!manualRut || !manualName) { setStatus('error'); setStatusMsg('RUT y nombre son obligatorios.'); return }
    setPerson({ rut: manualRut.trim(), full_name: manualName.trim(), birth_date: manualBirth, sex: manualSex })
    setStatus('idle')
  }

  const [hasActiveVisit, setHasActiveVisit] = useState(false)

  // Buscar visitante recurrente al escribir el RUT
  useEffect(() => {
    const fetchRecurring = async () => {
      const rutRaw = manualRut.trim()
      if (rutRaw.length < 7) {
        setHasActiveVisit(false)
        return
      }
      
      try {
        const res = await fetch(`/api/persons/${rutRaw}?t=${Date.now()}`, { cache: 'no-store' })
        const p = await res.json()
        if (p && !p.error) {
          setManualName(p.full_name)
          setManualSex(p.sex || '')
          setManualBirth(p.birth_date || '')
          setForm(f => ({ ...f, visitor_company: p.last_visitor_company || '', visited_person: p.last_visited_person || '', area: p.last_area || '' }))
          
          if (p.is_conflictive) {
            setIsConflictive(true)
            setConflictNotes(p.conflict_notes || 'Persona marcada como conflictiva')
            setStatus('error')
            setStatusMsg('Acceso bloqueado: Visitante conflictivo.')
          } else {
            setIsConflictive(false)
            setConflictNotes('')
            
            if (p.has_active_visit) {
              setHasActiveVisit(true)
              setStatus('error')
              setStatusMsg(`El RUT ${rutRaw} ya registra un Ingreso (Salida pendiente).`)
            } else {
              setHasActiveVisit(false)
              if (statusMsg.includes('Ingreso')) {
                 setStatus('idle')
                 setStatusMsg('')
              }
            }
          }
        } else {
          setHasActiveVisit(false)
          setIsConflictive(false)
          setConflictNotes('')
        }
      } catch (err) {}
    }
    const t = setTimeout(fetchRecurring, 400)
    return () => clearTimeout(t)
  }, [manualRut])

  function resetForm() {
    setPerson(null); setManualRut(''); setManualName(''); setManualBirth(''); setManualSex('')
    setHasActiveVisit(false)
    setIsConflictive(false)
    setConflictNotes('')
    setForm(f => ({ ...f, visited_person: '', area: '', reason: '', visitor_company: '', vehicle_plate: '', notes: '' }))
    setVisitorType('')
    setProvenance('')
    setNewProvenance('')
    setShowNewProvenance(false)
    setStatus('idle'); setStatusMsg('')
    setTimeout(() => scanRef.current?.focus(), 100)
  }

  async function handleSavePersonOnly() {
    if (!manualRut || !manualName) { setStatus('error'); setStatusMsg('RUT y nombre son obligatorios para guardar.'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/persons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rut: manualRut.trim(),
          full_name: manualName.trim(),
          birth_date: manualBirth,
          sex: manualSex,
          visitor_company: form.visitor_company
        })
      })
      if (!res.ok) throw new Error('Error al guardar en base')
      setStatus('success')
      setStatusMsg('✓ Visitante guardado en base de datos correctamente.')
    } catch (err: any) {
      setStatus('error')
      setStatusMsg(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!person || !form.door_id) { setStatus('error'); setStatusMsg('Seleccione una puerta.'); return }
    if (!visitorType) { setStatus('error'); setStatusMsg('Seleccione si es Personal Interno o Externo.'); return }
    if (visitorType === 'EXTERNO' && !provenance && !newProvenance) {
      setStatus('error'); setStatusMsg('Indique la procedencia del visitante externo.'); return
    }
    setLoading(true)

    try {
      // Si hay nueva procedencia, guardarla primero
      let finalProvenance = provenance
      if (visitorType === 'EXTERNO' && showNewProvenance && newProvenance.trim()) {
        const resProv = await fetch('/api/provenances', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: newProvenance.trim(), company_id: profile?.company_id })
        })
        const savedProv = await resProv.json()
        finalProvenance = savedProv.name
        // Actualizar lista de procedencias localmente
        setProvenances(prev => [...prev.filter(p => p.name !== savedProv.name), savedProv])
      }

      const res = await fetch('/api/visits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...person,
          ...form,
          visitor_type: visitorType,
          provenance: visitorType === 'EXTERNO' ? finalProvenance : null,
          guard_id: profile?.id,
          company_id: profile?.role === 'superadmin' ? (doors.find(d => d.id === form.door_id)?.company_id) : profile?.company_id
        })
      })

      if (!res.ok) throw new Error('Error al registrar visita localmente')

      setStatus('success')
      setStatusMsg(`✓ ${person.full_name || person.rut} registrado correctamente`)
      setTimeout(resetForm, 3000)
    } catch (err: any) {
      setStatus('error')
      setStatusMsg(err.message)
    } finally {
      setLoading(false)
    }
  }

  const [showCamera, setShowCamera] = useState(false)

  // Cargar librería de escaneo vía CDN
  useEffect(() => {
    const script = document.createElement('script')
    script.src = "/js/html5-qrcode.min.js"
    script.async = true
    document.body.appendChild(script)
    return () => { 
      try { document.body.removeChild(script) } catch(e) {}
    }
  }, [])

  function startCamera() {
    setShowCamera(true)
    setTimeout(() => {
      // @ts-ignore
      const html5QrCode = new Html5Qrcode("reader");
      html5QrCode.start(
        { facingMode: "environment" }, 
        { fps: 10, qrbox: { width: 300, height: 150 } },
        (decodedText: string) => {
          onScan(decodedText)
          html5QrCode.stop().then(() => setShowCamera(false))
        },
        () => {}
      ).catch((err: any) => {
        console.error(err)
        alert("Error al iniciar cámara. Asegúrate de dar permisos.")
        setShowCamera(false)
      });
    }, 500)
  }

  const inputCls = "w-full bg-[#0a1628] border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-[#00A9E0] transition text-sm"

  return (
    <div className="min-h-screen bg-[#0a1628] p-4 md:p-8">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#00A9E0]/20 flex items-center justify-center">
            <ScanLine className="w-5 h-5 text-[#00A9E0]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Registro de Ingreso</h1>
            <p suppressHydrationWarning className="text-sm text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3" /> {new Date().toLocaleString('es-CL')}</p>
          </div>
        </div>

        {/* Botón Cámara para Celular (Visible solo en móviles) */}
        <div className="mb-6 md:hidden flex flex-col gap-3">
          <button 
            onClick={startCamera}
            className="w-full flex items-center justify-center gap-3 py-4 bg-[#00A9E0] text-white rounded-2xl font-bold shadow-lg shadow-[#00A9E0]/30 active:scale-95 transition"
          >
            <Camera className="w-6 h-6" /> ESCANEAR CÉDULA CON CÁMARA
          </button>
          <button 
            onClick={testConnection}
            className="w-full flex items-center justify-center gap-2 py-3 bg-slate-800 text-slate-300 rounded-xl font-medium border border-slate-700 active:scale-95 transition"
          >
            Probar Conexión con PC
          </button>
        </div>

        {showCamera && (
          <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md bg-[#111e35] rounded-3xl p-6 border border-[#00A9E0]/30">
              <h2 className="text-white text-center font-bold mb-4">Apunta al código PDF417</h2>
              <div id="reader" className="w-full rounded-2xl overflow-hidden border-2 border-[#00A9E0]"></div>
              <button 
                onClick={() => setShowCamera(false)}
                className="mt-6 w-full py-3 bg-slate-800 text-white rounded-xl font-bold border border-slate-700"
              >
                CERRAR CÁMARA
              </button>
            </div>
          </div>
        )}

        {/* Info Puerta Activa */}
        {form.door_id && (
          <div className="mb-6 px-4 py-2 bg-[#00A9E0]/10 border border-[#00A9E0]/20 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DoorOpen className="w-4 h-4 text-[#00A9E0]" />
              <span className="text-xs text-slate-400 uppercase font-semibold tracking-wider">Puerta Activa:</span>
              <span className="text-white text-sm font-bold">{doors.find(d => d.id === form.door_id)?.name}</span>
            </div>
            {doors.length > 1 && !profile?.door_id && (
              <button onClick={() => setForm(f => ({ ...f, door_id: '' }))} className="text-[#00A9E0] text-xs hover:underline">Cambiar</button>
            )}
          </div>
        )}

        {/* Tabs: Lector vs Manual */}
        <div className="flex bg-[#111e35] border border-[#00A9E0]/15 rounded-2xl p-1 mb-6">
          <button onClick={() => { setMode('scan'); setPerson(null); setTimeout(() => scanRef.current?.focus(), 100) }}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition ${mode === 'scan' ? 'bg-[#00A9E0] text-white shadow' : 'text-slate-400 hover:text-white'}`}>
            <ScanLine className="w-4 h-4" /> Lector de Cédula
          </button>
          <button onClick={() => { setMode('manual'); setPerson(null) }}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition ${mode === 'manual' ? 'bg-[#00A9E0] text-white shadow' : 'text-slate-400 hover:text-white'}`}>
            <Keyboard className="w-4 h-4" /> Ingreso Manual
          </button>
        </div>

        {/* MODO LECTOR */}
        {mode === 'scan' && !person && (
          <div className="bg-[#111e35] border-2 border-dashed border-[#00A9E0]/40 rounded-2xl p-10 mb-6 text-center cursor-pointer hover:border-[#00A9E0]/70 transition"
            onClick={() => scanRef.current?.focus()}>
            <input ref={scanRef} type="text" value={rawScan} onChange={e => setRawScan(e.target.value)}
              onKeyDown={handleScanInput} className="opacity-0 absolute pointer-events-none" autoFocus />
            <ScanLine className="w-14 h-14 text-[#00A9E0]/50 mx-auto mb-3" />
            <p className="text-white font-medium text-lg">Apunte el lector al dorso de la cédula</p>
            <p className="text-slate-400 text-sm mt-1">O haga clic aquí para activar el campo de lectura</p>
          </div>
        )}

        {/* MODO MANUAL */}
        {mode === 'manual' && !person && (
          <div className="bg-[#111e35] border border-[#00A9E0]/15 rounded-2xl p-6 mb-6">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Keyboard className="w-4 h-4 text-[#00A9E0]" /> Datos del visitante
            </h3>

            {isConflictive && (
              <div className="bg-red-600 border-2 border-red-400 rounded-xl p-4 mb-6 shadow-lg shadow-red-900/40">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-white flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-white font-bold text-base">¡ALERTA: VISITANTE CONFLICTIVO!</h4>
                    <p className="text-red-100 text-sm mt-0.5">{conflictNotes}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-300 mb-1">RUT *</label>
                  <input type="text" value={manualRut} onChange={e => setManualRut(e.target.value)}
                    placeholder="12.345.678-9" className={inputCls} />
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-1">Sexo</label>
                  <select value={manualSex} onChange={e => setManualSex(e.target.value)} className={inputCls}>
                    <option value="">No especificar</option>
                    <option value="M">Masculino</option>
                    <option value="F">Femenino</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm text-slate-300 mb-1">Nombre completo *</label>
                <input type="text" value={manualName} onChange={e => setManualName(e.target.value)}
                  placeholder="Juan Andrés Pérez González" className={inputCls} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-300 mb-1">Fecha de nacimiento</label>
                  <input type="date" value={manualBirth} onChange={e => setManualBirth(e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-1">Empresa del visitante</label>
                  <input type="text" value={form.visitor_company} onChange={e => setForm(f => ({ ...f, visitor_company: e.target.value }))}
                    placeholder="Ej: ONLINE System" className={inputCls} />
                </div>
              </div>
              {status === 'error' && (
                <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-red-300 text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />{statusMsg}
                </div>
              )}
              {status === 'success' && statusMsg.includes('base') && (
                <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-xl p-3 text-green-300 text-sm">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />{statusMsg}
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button 
                  onClick={handleSavePersonOnly}
                  disabled={loading}
                  className="flex-1 bg-slate-800 text-white font-semibold py-3 rounded-xl hover:bg-slate-700 transition disabled:opacity-50 border border-slate-600">
                  {loading ? '...' : '💾 Guardar en base'}
                </button>
                <button 
                  onClick={handleManualConfirm}
                  disabled={hasActiveVisit || isConflictive}
                  className="flex-[2] bg-gradient-to-r from-[#00A9E0] to-[#0082b3] text-white font-semibold py-3 rounded-xl transition disabled:opacity-50 disabled:grayscale">
                  {isConflictive ? 'Ingreso Bloqueado' : hasActiveVisit ? 'Visita en Curso' : 'Confirmar datos del visitante →'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Persona confirmada (ambos modos) */}
        {person && (
          <div className="bg-[#111e35] border border-[#00A9E0]/30 rounded-2xl p-5 mb-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#00A9E0]/20 flex items-center justify-center flex-shrink-0">
              <UserCheck className="w-6 h-6 text-[#00A9E0]" />
            </div>
            <div className="flex-1">
              <p className="text-white font-bold text-lg">{person.full_name || '—'}</p>
              <p className="text-[#00A9E0] font-mono text-sm">RUT: {person.rut}</p>
              {person.birth_date && <p className="text-slate-400 text-xs">Nacimiento: {person.birth_date} {person.sex ? `· ${person.sex === 'M' ? 'Masculino' : 'Femenino'}` : ''}</p>}
            </div>
            <button onClick={resetForm} className="text-slate-400 hover:text-red-400 text-sm underline transition">Cambiar</button>
          </div>
        )}

        {/* Selector Interno / Externo */}
        {person && (
          <div className="bg-[#111e35] border border-[#00A9E0]/15 rounded-2xl p-5 mb-4">
            <p className="text-slate-300 text-sm font-semibold mb-3 flex items-center gap-2">
              <Users className="w-4 h-4 text-[#00A9E0]" /> Tipo de personal *
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => { setVisitorType('INTERNO'); setProvenance(''); setShowNewProvenance(false) }}
                className={`flex flex-col items-center gap-2 py-4 px-3 rounded-xl border-2 transition font-semibold text-sm ${
                  visitorType === 'INTERNO'
                    ? 'border-green-400 bg-green-400/10 text-green-300'
                    : 'border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-500'
                }`}
              >
                <Users className="w-5 h-5" />
                Personal Interno
              </button>
              <button
                type="button"
                onClick={() => setVisitorType('EXTERNO')}
                className={`flex flex-col items-center gap-2 py-4 px-3 rounded-xl border-2 transition font-semibold text-sm ${
                  visitorType === 'EXTERNO'
                    ? 'border-orange-400 bg-orange-400/10 text-orange-300'
                    : 'border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-500'
                }`}
              >
                <Truck className="w-5 h-5" />
                Personal Externo
              </button>
            </div>

            {/* Procedencia (solo para externos) */}
            {visitorType === 'EXTERNO' && (
              <div className="mt-4 space-y-3">
                <label className="block text-sm font-medium text-slate-300">Procedencia *</label>
                {!showNewProvenance ? (
                  <>
                    <select
                      value={provenance}
                      onChange={e => {
                        if (e.target.value === '__nueva__') {
                          setShowNewProvenance(true)
                          setProvenance('')
                        } else {
                          setProvenance(e.target.value)
                        }
                      }}
                      className="w-full bg-[#0a1628] border border-slate-700 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-orange-400 transition text-sm"
                    >
                      <option value="">Seleccionar procedencia...</option>
                      {provenances.map(p => (
                        <option key={p.name} value={p.name}>{p.name}</option>
                      ))}
                      <option value="__nueva__">+ Crear nueva procedencia...</option>
                    </select>
                  </>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newProvenance}
                      onChange={e => setNewProvenance(e.target.value)}
                      placeholder="Escriba la nueva procedencia..."
                      className="flex-1 bg-[#0a1628] border border-orange-400/60 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-orange-400 transition text-sm"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => { setShowNewProvenance(false); setNewProvenance('') }}
                      className="px-3 py-2 bg-slate-700 text-slate-300 rounded-xl text-sm hover:bg-slate-600 transition"
                    >
                      Cancelar
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Formulario de visita */}
        {person && (
          <form onSubmit={handleSubmit} className="bg-[#111e35] border border-[#00A9E0]/15 rounded-2xl p-6 space-y-4">

            {/* Selector de Puerta (solo si no hay una por defecto) */}
            {!form.door_id && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1 flex items-center gap-1">
                  <DoorOpen className="w-3 h-3 text-[#00A9E0]" /> Seleccionar Puerta de acceso *
                </label>
                <select value={form.door_id} onChange={e => setForm(f => ({ ...f, door_id: e.target.value }))} required className={inputCls}>
                  <option value="">Seleccionar puerta...</option>
                  {doors.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                </select>
              </div>
            )}


            {/* Requeridos */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Visita a quién *</label>
                <input type="text" value={form.visited_person} onChange={e => setForm(f => ({ ...f, visited_person: e.target.value }))}
                  required placeholder="Nombre del contacto" className={inputCls} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Área / Departamento *</label>
                <input type="text" value={form.area} onChange={e => setForm(f => ({ ...f, area: e.target.value }))}
                  required placeholder="Gerencia, Bodega..." className={inputCls} list="departmentsList" />
                <datalist id="departmentsList">
                  {departments.map(d => <option key={d.id} value={d.name} />)}
                </datalist>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Motivo de visita *</label>
              <input type="text" value={form.reason} onChange={e => setForm(f => ({ ...f, reason: e.target.value }))}
                required placeholder="Reunión, entrega, trámite..." className={inputCls} />
            </div>

            {/* Opcionales */}
            <details className="group" open>
              <summary className="text-sm text-slate-400 cursor-pointer hover:text-slate-200 transition list-none flex items-center gap-2">
                <span className="text-[#00A9E0]">+</span> Información Adicional (Empresa, Vehículo, Notas)
              </summary>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm text-slate-300 mb-1">Empresa del visitante</label>
                  <input type="text" value={form.visitor_company} onChange={e => setForm(f => ({ ...f, visitor_company: e.target.value }))}
                    placeholder="Ej: ONLINE System" className={inputCls} />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <label className="block text-sm text-slate-300 mb-1">Placa vehículo</label>
                  <input type="text" value={form.vehicle_plate} onChange={e => setForm(f => ({ ...f, vehicle_plate: e.target.value }))}
                    placeholder="BBCC12" className={inputCls} />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm text-slate-300 mb-1">Observaciones</label>
                  <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                    rows={2} placeholder="Notas adicionales..." className={`${inputCls} resize-none`} />
                </div>
              </div>
            </details>

            {/* Status */}
            {status === 'error' && (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-red-300 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />{statusMsg}
              </div>
            )}
            {status === 'success' && (
              <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-xl p-3 text-green-300 text-sm">
                <CheckCircle className="w-4 h-4 flex-shrink-0" />{statusMsg}
              </div>
            )}

            <button type="submit" disabled={loading}
              className="w-full bg-gradient-to-r from-[#00A9E0] to-[#0082b3] hover:from-[#00bfff] hover:to-[#00A9E0] text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-[#00A9E0]/25 disabled:opacity-50 text-lg">
              {loading ? 'Registrando...' : '✓ Registrar Ingreso'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default function RegistroPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a1628] flex items-center justify-center text-white">Cargando módulo de registro...</div>}>
      <RegistroContent />
    </Suspense>
  )
}
