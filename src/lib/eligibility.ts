import type { Scheme, WidowProfile, Language } from "../types";
import { SCHEMES } from "./schemes";

export interface MatchResult {
  scheme: Scheme;
  needsBplVerification: boolean;
}

export function checkEligibility(
  answers: Omit<WidowProfile, "id" | "helperId" | "documents" | "applications" | "createdAt" | "updatedAt" | "languagePreference">,
  schemes: Scheme[] = SCHEMES
): MatchResult[] {
  const results: MatchResult[] = [];

  for (const scheme of schemes) {
    const { minAge, maxAge, maritalStatus, bplRequired } = scheme.eligibility;

    const ageOk = answers.age >= minAge && answers.age <= maxAge;
    const maritalOk = maritalStatus.includes(answers.maritalStatus);

    if (!ageOk || !maritalOk) continue;

    let needsBplVerification = false;
    if (bplRequired) {
      if (answers.bplStatus === "no") continue;
      if (answers.bplStatus === "unknown") needsBplVerification = true;
    }

    results.push({ scheme, needsBplVerification });
  }

  const categoryOrder: Record<string, number> = {
    pension: 0,
    food: 1,
    housing: 2,
    health: 3,
    other: 4,
  };

  results.sort(
    (a, b) =>
      (categoryOrder[a.scheme.category] ?? 5) -
      (categoryOrder[b.scheme.category] ?? 5)
  );

  return results;
}

export function consolidateDocuments(
  matchedSchemes: Scheme[]
): { name: { en: string; hi: string; te: string }; source: { en: string; hi: string; te: string } }[] {
  const seen = new Map<string, { name: { en: string; hi: string; te: string }; source: { en: string; hi: string; te: string } }>();

  for (const scheme of matchedSchemes) {
    for (const doc of scheme.documentsRequired) {
      const key = doc.name.en;
      if (!seen.has(key)) {
        seen.set(key, { name: doc.name, source: doc.source });
      }
    }
  }

  return Array.from(seen.values());
}

export function localize(
  value: Record<Language, string>,
  lang: Language
): string {
  return value[lang] || value.en;
}
