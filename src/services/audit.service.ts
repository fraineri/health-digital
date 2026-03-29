import { prisma } from '@/lib/prisma';
import type { AuditAction, Prisma } from '@prisma/client';

interface AuditLogInput {
  userId: string;
  action: AuditAction;
  entityType: 'Patient' | 'Consultation' | 'ComplementaryStudy';
  entityId: string;
  metadata?: Prisma.InputJsonValue;
}

/**
 * Registra una entrada de auditoría de forma fire-and-forget.
 * NO lanza excepciones — un fallo de audit log no debe bloquear la operación principal.
 */
export async function createAuditLog(input: AuditLogInput): Promise<void> {
  try {
    await prisma.auditLog.create({ data: input });
  } catch (error) {
    console.error("[AuditLog] Failed to create audit entry:", error);
  }
}
