import { db } from "./db";
import type { AuditLog } from "../types";

export async function logAction(
  helperId: string,
  action: string,
  details: string
): Promise<void> {
  const entry: AuditLog = {
    id: crypto.randomUUID(),
    helperId,
    action,
    details,
    timestamp: Date.now(),
  };
  await db.auditLogs.add(entry);
}

export async function getAuditLogs(helperId: string): Promise<AuditLog[]> {
  return db.auditLogs
    .where("helperId")
    .equals(helperId)
    .reverse()
    .sortBy("timestamp");
}

export function generateCaseId(): string {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `STK-${num}`;
}
