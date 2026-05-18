const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fixVisit() {
  try {
    const rutToFix = '10504468-2';
    console.log(`Buscando persona con RUT: ${rutToFix}`);
    
    const person = await prisma.person.findUnique({
      where: { rut: rutToFix },
      include: { visits: true }
    });

    if (!person) {
      console.log('No se encontro la persona');
      return;
    }

    console.log(`Persona encontrada: ${person.full_name}. Revisando visitas...`);

    let fixedCount = 0;
    for (const visit of person.visits) {
      console.log(`Visita ID: ${visit.id}, Entrada: ${visit.entry_time}, Salida: ${visit.exit_time}, Activa: ${visit.is_active}`);
      if (visit.exit_time !== null && visit.is_active === true) {
        console.log(`>>> Inconsistencia detectada. Corrigiendo visita ID: ${visit.id}...`);
        await prisma.visit.update({
          where: { id: visit.id },
          data: { is_active: false }
        });
        fixedCount++;
        console.log(`>>> Visita ${visit.id} corregida (is_active = false)`);
      } else if (visit.exit_time === null && visit.is_active === true) {
        console.log(`>>> Visita sin salida registrada, pero activa. ¿Le ponemos salida? Solo si es error de la base de datos, lo dejamos asi por ahora.`);
      }
    }
    
    console.log(`Proceso completado. Visitas corregidas: ${fixedCount}`);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixVisit();
