const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const prisma = new PrismaClient();

async function generateReport() {
  const depts = await prisma.department.findMany({ 
    orderBy: { name: 'asc' },
    select: { name: true }
  });
  
  const visits = await prisma.visit.groupBy({
    by: ['area'],
    _count: { _all: true }
  });

  let report = "REPORTE DE DEPARTAMENTOS SCANIA - " + new Date().toLocaleDateString() + "\n";
  report += "====================================================\n\n";
  
  report += "1. DEPARTAMENTOS MAESTROS (VIGENTES EN SISTEMA):\n";
  report += "----------------------------------------------------\n";
  depts.forEach(d => {
    report += "- " + d.name + "\n";
  });
  
  report += "\n\n2. RESUMEN DE VISITAS POR ÁREA (TRAZABILIDAD):\n";
  report += "----------------------------------------------------\n";
  visits.forEach(v => {
    report += "- " + (v.area || "Sin Especificar") + ": " + v._count._all + " registros\n";
  });

  fs.writeFileSync('REPORTE_DEPARTAMENTOS.txt', report, 'latin1');
  console.log("Reporte generado con éxito en REPORTE_DEPARTAMENTOS.txt");
}

generateReport()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
