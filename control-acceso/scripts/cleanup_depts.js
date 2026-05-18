const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const DEPTS_TO_REPLACE = [
  "CARLOS REYES", "CARLOS  REYES", "CRISTIAN CUBILLOS", "CRISTINA JULIO", "CRISTINA  JULIO",
  "DAFNEJEREZ", "DIEGODUTHU", "HECTOR BORQUEZ VENTAS", "JAIME MOLINA", "JAIME  MOLINA",
  "JAVIRA RAMOS", "JAVIRA  RAMOS", "MARCOS GHOSOLFO", "MARCOS MAGGIOLO", "MIGUELMANRIQUEZ",
  "NOMBRE DE DEPARTAMENTO", "RODRIGOOSSES", "ROSSIO SAN MARTIN", "RUPERTO ALVAREZ",
  "SEBASTIAN VADIVIA", "SEBASTIAN VALDIVA", "ASESOR DE  VENTAS", "ASESORES  SERVICIOS"
];

async function cleanup() {
  const company = await prisma.company.findFirst();
  if (!company) return;

  // 1. Ensure "SIN INFORMAR" exists
  await prisma.department.upsert({
    where: { name: "SIN INFORMAR" },
    update: {},
    create: { name: "SIN INFORMAR", company_id: company.id }
  });

  console.log("Iniciando reemplazo en visitas...");
  
  // 2. Update Visits (case insensitive matching or manual list)
  const result = await prisma.visit.updateMany({
    where: {
      area: { in: DEPTS_TO_REPLACE }
    },
    data: {
      area: "SIN INFORMAR"
    }
  });
  
  console.log(`Actualizadas ${result.count} visitas a 'SIN INFORMAR'.`);

  // 3. Delete incorrect departments
  const delResult = await prisma.department.deleteMany({
    where: {
      name: { in: DEPTS_TO_REPLACE }
    }
  });

  console.log(`Eliminados ${delResult.count} departamentos del maestro.`);
}

cleanup()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
