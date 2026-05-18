const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const person = await prisma.person.findUnique({
    where: { rut: '8113656-4' }
  })
  console.log(JSON.stringify(person, null, 2))
}

main().catch(console.error).finally(() => prisma.$disconnect())
