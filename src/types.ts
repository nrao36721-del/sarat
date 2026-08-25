export type Language = "en" | "hi" | "te";

export type HelperType =
  | "csc"
  | "anganwadi"
  | "asha"
  | "panchayat"
  | "ngo"
  | "other";

export interface HelperProfile {
  id: string;
  fullName: string;
  phoneNumber: string;
  helperType: HelperType;
  village: string;
  district: string;
  state: string;
  pinHash: string;
  languagePreference: Language;
  createdAt: number;
  lastLoginAt: number;
}

export type MaritalStatus = "widow" | "divorced" | "separated";
export type BplStatus = "yes" | "no" | "unknown";

export interface WidowProfile {
  id: string;
  helperId: string;
  name: string;
  age: number;
  phone: string;
  village: string;
  district: string;
  maritalStatus: MaritalStatus;
  bplStatus: BplStatus;
  hasAadhaar: boolean;
  hasDeathCertificate: boolean;
  hasBankAccount: boolean;
  languagePreference: Language;
  documents: DocumentEntry[];
  applications: ApplicationEntry[];
  createdAt: number;
  updatedAt: number;
}

export interface DocumentEntry {
  name: LocalizedString;
  hasIt: boolean;
  source?: LocalizedString;
}

export interface ApplicationEntry {
  schemeId: string;
  dateApplied: number;
  status: "submitted" | "pending" | "stuck";
  caseId?: string;
}

export type SchemeCategory = "pension" | "housing" | "food" | "health" | "other";

export interface Scheme {
  id: string;
  name: LocalizedString;
  benefit: LocalizedString;
  eligibility: {
    minAge: number;
    maxAge: number;
    maritalStatus: MaritalStatus[];
    bplRequired: boolean;
  };
  documentsRequired: {
    name: LocalizedString;
    source: LocalizedString;
  }[];
  whereToApply: LocalizedString;
  category: SchemeCategory;
}

export type LocalizedString = Record<Language, string>;

export type StuckReason = "fingerprint" | "aadhaar" | "rejected" | "other";

export interface StuckCase {
  id: string;
  profileId: string;
  helperId: string;
  reason: StuckReason;
  note: string;
  createdAt: number;
  status: "open" | "resolved";
  assignedCoordinator?: string;
}

export interface AuditLog {
  id: string;
  helperId: string;
  action: string;
  details: string;
  timestamp: number;
}
