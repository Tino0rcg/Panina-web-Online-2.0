const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function findPerson() {
  try {
    const persons = await prisma.person.findMany({
      where: {
        rut: {
          contains: '10504468'
        }
      },
      include: { visits: true }
    });

    if (persons.length === 0) {
      console.log('No se encontraron personas con un RUT que contenga "10504468".');
      const allPersons = await prisma.person.findMany({ take: 5 });
      console.log('Muestra de RUTs en la base de datos:', allPersons.map(p => p.rut));
      return;
    }

    for (const person of persons) {
      console.log(`\nPersona encontrada: ${person.full_name} (RUT: ${person.rut})`);
      for (const visit of person.visits) {
        console.log(`  Visita ID: ${visit.id}, Entrada: ${visit.entry_time}, Salida: ${visit.exit_time}, Activa: ${visit.is_active}`);
        if (visit.exit_time !== null && visit.is_active === true) {
          console.log(`  >>> Corrigiendo visita...`);
          await prisma.visit.update({
            where: { id: visit.id },
            data: { is_active: false }
          });
          console.log(`  >>> Visita corregida!`);
        } else if (visit.exit_time === null && visit.is_active === true) {
           // Perhaps the user meant it has no exit registered but it should be marked as exited?
           // The user said "figura que esta pendiente de salida, en consecuencia que tiene entrada y salida registrada"
           // This means the user expects it to have both, maybe it has both entry and exit in the frontend but in db it's active?
           // Or maybe it HAS entry and exit times in DB, but `is_active` is still true.
        }
      }
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

findPerson();
