const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkStats() {
  try {
    const total = await prisma.visit.count();
    const conSalida = await prisma.visit.count({ where: { exit_time: { not: null } } });
    const sinSalida = await prisma.visit.count({ where: { exit_time: null } });
    const activas = await prisma.visit.count({ where: { is_active: true } });
    const inactivas = await prisma.visit.count({ where: { is_active: false } });

    console.log('--- STATS DB ---');
    console.log(`Total: ${total}`);
    console.log(`Con salida: ${conSalida}`);
    console.log(`Sin salida: ${sinSalida}`);
    console.log(`Activas (is_active=true): ${activas}`);
    console.log(`Inactivas (is_active=false): ${inactivas}`);

    const visitsSinSalida = await prisma.visit.findMany({ where: { exit_time: null }, include: { person: true } });
    console.log('\nVisitas SIN salida (exit_time == null):');
    visitsSinSalida.forEach(v => console.log(`- ${v.person.rut} (${v.person.full_name}) | is_active: ${v.is_active} | exit_time: ${v.exit_time} | date: ${v.entry_time.toISOString().split('T')[0]}`));

    const visitsActivas = await prisma.visit.findMany({ where: { is_active: true }, include: { person: true } });
    console.log('\nVisitas ACTIVAS (is_active == true):');
    visitsActivas.forEach(v => console.log(`- ${v.person.rut} (${v.person.full_name}) | exit_time: ${v.exit_time} | date: ${v.entry_time.toISOString().split('T')[0]}`));

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkStats();
