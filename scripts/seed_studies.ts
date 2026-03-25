import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const INITIAL_STUDIES = [
  "Hemograma completo",
  "Glucemia (Ayuno)",
  "Uremia",
  "Creatininemia",
  "Ionograma (Sodio, Potasio, Cloro)",
  "Hepatograma (AST, ALT, FAL, Bilirrubina)",
  "Eritrosedimentacion (VSG)",
  "Colesterol Total",
  "Colesterol HDL",
  "Colesterol LDL",
  "Trigliceridos",
  "TSH (Tirotrofina)",
  "T4 Libre",
  "Insulina basal",
  "Hemoglobina Glicosilada (HbA1c)",
  "Cortisol (AM)",
  "Vitamina D3 (25-OH)",
  "Vitamina B12",
  "Ferritina",
  "Hierro Serico",
  "Magnesio en sangre",
  "Acido Folico",
  "PCR ultrasensible (Proteina C Reactiva)"
];

async function main() {
  console.log('Seeding StudyCatalog with initial studies...');

  for (const name of INITIAL_STUDIES) {
    await prisma.studyCatalog.upsert({
      where: { name },
      update: {},
      create: { name }
    });
  }

  const count = await prisma.studyCatalog.count();
  console.log(`StudyCatalog seeded successfully. Total entries: ${count}`);
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
