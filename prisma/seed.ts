// prisma/seed.ts
import 'dotenv/config';

import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import * as bcrypt from 'bcrypt';

import { PrismaClient } from '../generated/prisma/client';

const adapter = new PrismaMariaDb({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 5,
});

const prisma = new PrismaClient({ adapter });

async function hashPassword(password: string): Promise<string> {
    const saltRounds = Number(process.env.SALT_ROUNDS) || 10;
    return bcrypt.hash(password, saltRounds);
}

async function main(): Promise<void> {
    const adminEmail = process.env.SEED_ADMIN_EMAIL;
    const adminPassword = process.env.SEED_ADMIN_PASSWORD;
    const adminFullName = String(process.env.SEED_ADMIN_FULL_NAME);
    const adminPhone = String(process.env.SEED_ADMIN_PHONE);

    if (!adminEmail || !adminPassword) {
        throw new Error(
            'SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD must be provided',
        );
    }

    const adminRole = await prisma.role.upsert({
        where: { name: 'ADMIN' },
        update: {},
        create: { name: 'ADMIN' },
    });

    const passwordHash = await hashPassword(adminPassword);

    const admin = await prisma.user.upsert({
        where: { email: adminEmail },
        update: {
            fullName: adminFullName,
            passwordHash,
            roleId: adminRole.id,
            isActive: true,
        },
        create: {
            fullName: adminFullName,
            email: adminEmail,
            phone: adminPhone,
            passwordHash,
            roleId: adminRole.id,
            isActive: true,
            mustChangePassword: false,
        },
    });

    console.log(`Admin seeded successfully: ${admin.email}`);
}

main()
    .catch((error) => {
        console.error('Database seeding failed:', error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
