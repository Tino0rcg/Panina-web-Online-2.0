const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  await prisma.person.update({
    where: { rut: '8113656-4' },
    data: { birth_date: '2003-09-01' }
  })
  console.log('✅ Corregido el año de nacimiento de Leonardo.')
}

main().catch(console.error).finally(() => prisma.$disconnect())
