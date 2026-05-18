const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function deduplicate() {
  console.log("Buscando visitas duplicadas de importación...");
  
  // 1. Obtener todas las visitas de importación
  const importVisits = await prisma.visit.findMany({
    where: {
      reason: "Importación de datos históricos"
    },
    orderBy: {
      created_at: 'desc'
    }
  });

  console.log(`Total de visitas de importación encontradas: ${importVisits.length}`);

  const seen = new Set();
  const toDelete = [];

  for (const visit of importVisits) {
    // Definimos un duplicado como: mismo RUT (person_id) y mismo área en el proceso de importación
    // Dado que la importación se corrió completa varias veces, esto debería identificar los repetidos
    const key = `${visit.person_id}-${visit.area}-${visit.visitor_company}`;
    
    if (seen.has(key)) {
      toDelete.push(visit.id);
    } else {
      seen.add(key);
    }
  }

  console.log(`Se identificaron ${toDelete.push.length} duplicados para eliminar.`);

  if (toDelete.length > 0) {
    // Borrar en bloques para evitar límites de parámetros en SQL
    const batchSize = 100;
    for (let i = 0; i < toDelete.length; i += batchSize) {
      const batch = toDelete.slice(i, i + batchSize);
      await prisma.visit.deleteMany({
        where: {
          id: { in: batch }
        }
      });
      console.log(`Eliminados ${i + batch.length} registros...`);
    }
    console.log("Deduplicación completada con éxito.");
  } else {
    console.log("No se encontraron duplicados.");
  }
}

deduplicate()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
