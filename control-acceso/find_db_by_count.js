const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

async function checkDb(dbFile) {
  if (!fs.existsSync(dbFile)) return null;
  const prisma = new PrismaClient({
    datasources: { db: { url: `file:${dbFile}` } }
  });
  try {
    const count = await prisma.visit.count();
    const active = await prisma.visit.count({ where: { exit_time: null } });
    return { count, active };
  } catch (e) {
    return null;
  } finally {
    await prisma.$disconnect();
  }
}

async function run() {
  const potentials = [
    'c:/Users/Alejandro Contreras/Downloads/Panina-web-Online-2.0/control-acceso/prisma/dev.db',
    'c:/Users/Alejandro Contreras/Downloads/Panina-web-Online-2.0/control-acceso-desktop/resources/dev.db',
    'c:/Users/Alejandro Contreras/AppData/Roaming/control-acceso-pc/dev.db',
    'c:/Users/Alejandro Contreras/AppData/Local/control-acceso-pc/dev.db',
  ];
  
  for (const p of potentials) {
    const stats = await checkDb(p);
    if (stats) {
      console.log(`DB: ${p}`);
      console.log(`  Total: ${stats.count}`);
      console.log(`  Active (pending): ${stats.active}`);
    } else {
      console.log(`DB: ${p} - Not found or invalid`);
    }
  }
}

run();
