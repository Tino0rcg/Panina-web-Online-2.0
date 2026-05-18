const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const company = await prisma.company.findFirst()
  if (!company) {
    console.log("No company found!")
    return
  }

  // Create admin user
  const admin = await prisma.userProfile.create({
    data: {
      email: 'admin@online.cl',
      password: 'admin',
      role: 'superadmin',
      full_name: 'Administrador Scania',
      company_id: company.id,
      active: true
    }
  })
  
  console.log("Created admin in DB:", admin)
}

main().catch(console.error).finally(() => prisma.$disconnect())
