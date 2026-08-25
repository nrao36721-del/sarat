import Dexie, { type Table } from "dexie";
import type {
  HelperProfile,
  WidowProfile,
  StuckCase,
  AuditLog,
} from "../types";

export class SarathiDB extends Dexie {
  helpers!: Table<HelperProfile, string>;
  widows!: Table<WidowProfile, string>;
  stuckCases!: Table<StuckCase, string>;
  auditLogs!: Table<AuditLog, string>;

  constructor() {
    super("sarathi-db");
    this.version(1).stores({
      helpers: "id, helperType, district",
      widows: "id, helperId, createdAt, updatedAt",
      stuckCases: "id, profileId, helperId, createdAt, status",
      auditLogs: "id, helperId, timestamp",
    });
  }
}

export const db = new SarathiDB();
