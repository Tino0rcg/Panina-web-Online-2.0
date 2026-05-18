const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function findVisits() {
  try {
    const visits = await prisma.visit.findMany({
      where: {
        is_active: true
      },
      include: { person: true }
    });

    console.log(`Visitas activas: ${visits.length}`);
    for (const v of visits) {
      console.log(`- Persona: ${v.person.full_name}, RUT: ${v.person.rut}, Visita ID: ${v.id}, Entrada: ${v.entry_time}, Salida: ${v.exit_time}`);
    }

    // Y también buscar si alguna persona tiene RUT similar a 10.504.468 o 10504468
    const persons = await prisma.person.findMany({
      where: {
        OR: [
          { rut: { contains: '504' } },
          { rut: { contains: '468' } }
        ]
      }
    });
    console.log(`\nPersonas sospechosas de ser la que busca el usuario:`);
    for (const p of persons) {
      console.log(`- ${p.full_name}, RUT: ${p.rut}`);
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

findVisits();
