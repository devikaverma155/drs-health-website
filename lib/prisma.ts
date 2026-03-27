import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

// Reuse one client per process (dev HMR + serverless warm instances) to avoid exhausting DB pool limits (e.g. Supabase Session mode).
globalForPrisma.prisma = prisma;
