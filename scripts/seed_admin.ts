import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const plainPassword = 'admin'
  const hashedPassword = await bcrypt.hash(plainPassword, 10)

  // Omit the `id` field since it uses `uuid()` by default
  const user = await prisma.user.upsert({
    where: { email: 'doctora@clinica.com' },
    update: {
      password: hashedPassword,
    },
    create: {
      name: 'Doctora General',
      email: 'doctora@clinica.com',
      password: hashedPassword,
      role: 'DOCTOR'
    },
  })
  console.log({ user })
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
