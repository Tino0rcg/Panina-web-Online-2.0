const { PrismaClient } = require('@prisma/client');
const path = require('path');

// Obtener la ruta de AppData donde Electron guarda la base de datos real del usuario
const appDataPath = process.env.APPDATA || (process.platform === 'darwin' ? process.env.HOME + '/Library/Application Support' : process.env.HOME + '/.local/share');
const dbPath = path.join(appDataPath, 'control-acceso-pc', 'dev.db');

console.log('Conectando a base de datos de produccion en:', dbPath);

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `file:${dbPath}`
    }
  }
});

async function fixProd() {
  try {
    // 1. Restaurar is_active = true a todos los historicos que pudieron haberse afectado en pruebas
    const res = await prisma.visit.updateMany({
      where: {
        is_active: false,
        exit_time: { not: null }
      },
      data: { is_active: true }
    });
    console.log(`Revertidas ${res.count} visitas a is_active = true`);

    // 2. Cerrar todas las visitas pendientes que el usuario menciono
    const pendientes = await prisma.visit.findMany({
      where: { exit_time: null }
    });
    
    for (const v of pendientes) {
      await prisma.visit.update({
        where: { id: v.id },
        data: { exit_time: new Date() } // les ponemos hora de salida ahora
      });
      console.log(`Cerrada visita pendiente ID: ${v.id} de la persona: ${v.person_id}`);
    }
    console.log(`Corregidas ${pendientes.length} visitas pendientes.`);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

fixProd();
