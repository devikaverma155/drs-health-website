import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const password = await hash('admin123', 10);
  await prisma.admin.upsert({
    where: { email: 'admin@drshealth.com' },
    create: {
      email: 'admin@drshealth.com',
      password,
      name: 'Admin',
    },
    update: {},
  });
  console.log('Seeded admin: admin@drshealth.com / admin123');
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
