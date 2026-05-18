import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient()

async function main() {
  console.log('--- Iniciando Seed Local ---')

  // 1. Crear Empresa Scania por defecto
  const scania = await prisma.company.upsert({
    where: { rut: '76.000.001-1' },
    update: {},
    create: {
      name: 'Scania Chile',
      rut: '76.000.001-1',
      address: 'Santiago, Chile',
      logo_url: 'https://raw.githubusercontent.com/Marat-Dukhan/scania-logo/master/scania-logo.png'
    }
  })
  console.log('Empresa Scania creada:', scania.id)

  // 2. Crear Super Admin
  const admin = await prisma.userProfile.upsert({
    where: { email: 'admin@online.cl' },
    update: {},
    create: {
      full_name: 'Alejandro Contreras',
      email: 'admin@online.cl',
      password: 'admin', // En producción usaremos hash, pero para offline inicial es simple
      role: 'superadmin',
      active: true
    }
  })
  console.log('Super Admin creado:', admin.email)

  console.log('--- Seed Completado ---')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
