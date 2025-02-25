import { PrismaClient } from "@prisma/client";

// Evita múltiplas instâncias do Prisma no ambiente de desenvolvimento
const globalForPrisma = global as unknown as { prisma?: PrismaClient };

export const db = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}