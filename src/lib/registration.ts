import { db } from "./db";
import type { HelperProfile, Language } from "../types";
import { getStoredLanguage } from "./crypto";

export type { HelperProfile } from "../types";

export async function getHelperProfile(): Promise<HelperProfile | null> {
  const all = await db.helpers.toArray();
  return all.length > 0 ? all[0] : null;
}

export async function isRegistered(): Promise<boolean> {
  const profile = await getHelperProfile();
  return profile !== null;
}

export async function saveHelperProfile(
  profile: HelperProfile
): Promise<void> {
  await db.helpers.put(profile);
}

export async function updateHelperProfile(
  updates: Partial<HelperProfile>
): Promise<void> {
  const profile = await getHelperProfile();
  if (!profile) return;
  await db.helpers.put({ ...profile, ...updates });
}

export async function deleteHelperProfile(): Promise<void> {
  const profile = await getHelperProfile();
  if (!profile) return;
  await db.helpers.delete(profile.id);
}

export function getDefaultLanguage(): Language {
  return getStoredLanguage();
}
