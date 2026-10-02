import 'dotenv/config';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient, Role } from '../generated/prisma/client';

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Iniciando seed...');

  // Crear Tenant
  const tenant = await prisma.tenant.upsert({
    where: {
      name: 'Empresa Demo',
    },
    update: {},
    create: {
      name: 'Empresa Demo',
    },
  });

  console.log(`Tenant creado: ${tenant.name}`);

  // Crear usuario administrador
  const admin = await prisma.user.upsert({
    where: {
      email: 'admin@demo.com',
    },
    update: {},
    create: {
      email: 'admin@demo.com',
      name: 'Administrador',
      password: '123456',
      telephone: '88888888',
      tenantId: tenant.id,
      role: Role.ADMIN,
    },
  });

  console.log(`Usuario administrador creado: ${admin.email}`);

  // Crear usuario normal
  const user = await prisma.user.upsert({
    where: {
      email: 'usuario@demo.com',
    },
    update: {},
    create: {
      email: 'usuario@demo.com',
      name: 'Usuario Demo',
      password: '123456',
      telephone: '87777777',
      tenantId: tenant.id,
      role: Role.USER,
    },
  });

  console.log(`Usuario normal creado: ${user.email}`);

  console.log('Seed ejecutado correctamente.');
}

main()
  .catch((error) => {
    console.error('Error ejecutando el seed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
