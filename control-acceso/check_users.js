const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  const users = await prisma.userProfile.findMany({ take: 2 });
  console.log(users);
  await prisma.$disconnect();
}
run();
