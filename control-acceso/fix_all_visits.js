const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fixAllInconsistencies() {
  try {
    const visitsToFix = await prisma.visit.findMany({
      where: {
        is_active: true,
        exit_time: {
          not: null
        }
      },
      include: {
        person: true
      }
    });

    console.log(`Encontradas ${visitsToFix.length} visitas con inconsistencia (tienen salida pero siguen activas).`);

    let count = 0;
    for (const visit of visitsToFix) {
      await prisma.visit.update({
        where: { id: visit.id },
        data: { is_active: false }
      });
      count++;
    }

    console.log(`Se corrigieron ${count} visitas exitosamente.`);
    
    // Y verificamos si alguna de esas era 10505468-8 o similar
    const fixedRuts = visitsToFix.map(v => v.person.rut);
    const soughtRut = fixedRuts.find(r => r.includes('1050') || r.includes('468'));
    if (soughtRut) {
      console.log(`Entre las corregidas, estaba el RUT similar al que buscabas: ${soughtRut}`);
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixAllInconsistencies();
