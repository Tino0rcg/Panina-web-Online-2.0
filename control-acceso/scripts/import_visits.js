const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

function calculateDV(rut) {
  let sum = 0;
  let multiplier = 2;
  const rutStr = rut.toString().split('').reverse().join('');
  for (const char of rutStr) {
    sum += parseInt(char) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }
  const remainder = sum % 11;
  const dv = 11 - remainder;
  if (dv === 11) return '0';
  if (dv === 10) return 'K';
  return dv.toString();
}

const INITIAL_DEPARTMENTS = [
  "AREA USADOS", "AREA COMERCIAL", "ASESOR DE VENTAS", "ASESORES SERVICIOS",
  "ASESORES DE VENTAS", "BODEGA", "CASINO", "CONTABILIDAD", "FRAVAL PINTURA",
  "GERENCIA", "GRUPO NORTE", "INFORMATICA", "MARKETINK", "MASTER DRIVE",
  "OPERACIONES", "RECEPCIÓN", "RECURSOS HUMANOS", "REPUESTOS", "SALA PINTURA",
  "SALA CAPACITACION", "SALA LAVADOS", "SERVICIOS GENERALES", "SINIESTRO",
  "TALLER", "TALLER MANTENCION"
];

async function main() {
  const filePath = path.join(__dirname, '..', '..', 'VISITAS_CARGAS.prn');
  if (!fs.existsSync(filePath)) {
    console.error('No se encuentra el archivo VISITAS_CARGAS.prn');
    return;
  }

  const company = await prisma.company.findFirst();
  if (!company) {
    console.error('No hay empresas creadas. Cree una empresa primero.');
    return;
  }

  const door = await prisma.door.findFirst({ where: { company_id: company.id } });
  if (!door) {
    console.error('No hay puertas creadas. Cree una puerta primero.');
    return;
  }

  // Seed initial departments
  console.log('Sembrando departamentos iniciales...');
  for (const name of INITIAL_DEPARTMENTS) {
    await prisma.department.upsert({
      where: { name },
      update: {},
      create: { name, company_id: company.id }
    });
  }

  const knownDepts = new Set((await prisma.department.findMany()).map(d => d.name));

  const content = fs.readFileSync(filePath, 'latin1');
  const lines = content.split('\n');

  console.log(`Procesando ${lines.length} líneas...`);

  let count = 0;
  for (let i = 1; i < lines.length; i++) { // Skip header
    const line = lines[i];
    if (line.trim().length < 10) continue;

    // Parsing by widths
    const rutNum = line.substring(0, 12).trim();
    const nombre = line.substring(12, 41).trim();
    const areaRaw = line.substring(58, 83).trim();
    const genero = line.substring(83, 97).trim();
    const empresaVis = line.substring(97).trim();

    if (!rutNum || isNaN(parseInt(rutNum))) continue;

    const fullRut = `${rutNum}-${calculateDV(rutNum)}`;
    
    let areaToSave = "Sin Informar";
    if (areaRaw) {
      const cleanArea = areaRaw.toUpperCase().trim().replace(/\s+/g, ' ');
      if (knownDepts.has(cleanArea)) {
        areaToSave = cleanArea;
      } else {
        // Create new department if not exists
        if (!knownDepts.has(cleanArea)) {
          await prisma.department.create({ data: { name: cleanArea, company_id: company.id } });
          knownDepts.add(cleanArea);
          console.log(`Nuevo departamento creado: ${cleanArea}`);
        }
        areaToSave = "Sin Informar"; // As requested: unknown goes to "Sin Informar"
      }
    }

    // 1. Create or Update Person
    const person = await prisma.person.upsert({
      where: { rut: fullRut },
      update: {
        full_name: nombre,
        sex: genero === 'Masculino' ? 'M' : (genero === 'Femenino' ? 'F' : null),
        last_visitor_company: empresaVis || null
      },
      create: {
        rut: fullRut,
        full_name: nombre,
        sex: genero === 'Masculino' ? 'M' : (genero === 'Femenino' ? 'F' : null),
        last_visitor_company: empresaVis || null
      }
    });

    // 2. Create Visit
    await prisma.visit.create({
      data: {
        company_id: company.id,
        door_id: door.id,
        person_id: person.id,
        visited_person: "Importación Masiva",
        area: areaToSave,
        reason: "Importación de datos históricos",
        entry_time: new Date(),
        exit_time: new Date(), // Same day as requested
        visitor_company: empresaVis || null
      }
    });

    count++;
    if (count % 100 === 0) console.log(`Cargados ${count} registros...`);
  }

  console.log(`Carga completada: ${count} visitas registradas.`);
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
