import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log('🚀 Iniciando configuración de SCANIA local...')

  // 1. Crear Empresa Scania Chile
  const company = await prisma.company.upsert({
    where: { id: 'scania-chile-id' },
    update: {},
    create: {
      id: 'scania-chile-id',
      name: 'Scania Chile',
      logo_url: 'https://1000logos.net/wp-content/uploads/2020/03/Scania-Logo-1995-1024x609.jpg'
    }
  })
  console.log('✅ Empresa creada:', company.name)

  // 2. Crear Puerta Principal
  const door = await prisma.door.create({
    data: {
      name: 'Acceso Principal Scania',
      location: 'Portería Norte',
      company_id: company.id,
      active: true
    }
  })
  console.log('✅ Puerta creada:', door.name)

  // 3. Asegurar Usuario Admin con Empresa
  await prisma.userProfile.upsert({
    where: { email: 'admin@online.cl' },
    update: { company_id: company.id },
    create: {
      email: 'admin@online.cl',
      password: 'admin',
      full_name: 'Administrador Scania',
      role: 'superadmin',
      company_id: company.id,
      active: true
    }
  })
  console.log('✅ Usuario admin vinculado a Scania')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
