# 🔐 Sistema de Control de Acceso — ONLINE System

Sistema web multi-empresa para registro de visitas con lector de cédula de identidad chilena.

---

## ⚡ Configuración en 10 minutos

### PASO 1 — Crear proyecto en Supabase (gratis)

1. Ve a [https://supabase.com](https://supabase.com)
2. Clic en **"Start your project"** → crear cuenta o iniciar sesión
3. Clic en **"New Project"**
4. Nombre: `control-acceso` | Región: **South America (São Paulo)**
5. Esperar ~2 minutos a que el proyecto se cree

### PASO 2 — Obtener las claves API

En tu proyecto Supabase → **Settings → API**:

| Variable | Dónde encontrarla |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | "Project URL" |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | "anon / public" key |
| `SUPABASE_SERVICE_ROLE_KEY` | "service_role" key |

Editar el archivo `.env.local` con esos 3 valores.

### PASO 3 — Crear la base de datos

1. Supabase → **SQL Editor** → "New query"
2. Copiar todo el contenido de `supabase/schema.sql`
3. Clic en **"Run"** → verificar "Success"

### PASO 4 — Crear el Super Admin

En Supabase → **Authentication → Users → "Invite user"**

Email: tu correo de administrador. Luego en SQL Editor:

```sql
INSERT INTO user_profiles (id, company_id, role, full_name, active)
VALUES (
  'UUID-DEL-USUARIO',
  NULL,
  'superadmin',
  'Administrador General',
  true
);
```

### PASO 5 — Arrancar el sistema

```bash
npm run dev
```

Abrir: http://localhost:3000

---

## 🏗️ Estructura del proyecto

```
src/app/
├── page.tsx                    # Login
├── dashboard/
│   ├── page.tsx                # Dashboard principal (stats)
│   ├── registro/page.tsx       # Registro entrada con lector cédula
│   ├── salida/page.tsx         # Registro salida
│   ├── historial/page.tsx      # Historial + exportar Excel
│   ├── usuarios/page.tsx       # Gestión de usuarios
│   └── empresas/page.tsx       # Gestión empresas (superadmin)
```

## 👥 Roles

| Rol | Acceso |
|---|---|
| `superadmin` | Todo el sistema, todas las empresas |
| `admin` | Su empresa: usuarios, puertas, historial, reportes |
| `guard` | Solo registrar entrada y salida |

## 🖨️ Lector de cédula recomendado

Lector PDF417 USB (lee el dorso de la cédula chilena):
- **Zebra DS2208** (~$25.000 CLP) economico
- **Honeywell Xenon 1900** (~$45.000 CLP) profesional
