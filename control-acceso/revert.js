const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function revert() {
  try {
    const res = await prisma.visit.updateMany({
      where: {
        is_active: false,
        exit_time: { not: null }
      },
      data: { is_active: true }
    });
    console.log(`Revertidas ${res.count} visitas a is_active = true`);

    // Tambien voy a poner exit_time a los 3 registros pendientes, porque eso es lo que queria el usuario
    const pendientes = await prisma.visit.findMany({
      where: { exit_time: null }
    });
    
    for (const v of pendientes) {
      await prisma.visit.update({
        where: { id: v.id },
        data: { exit_time: new Date() } // o v.entry_time
      });
    }
    console.log(`Cerradas ${pendientes.length} visitas pendientes.`);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

revert();
