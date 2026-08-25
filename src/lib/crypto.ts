import type { Language } from "../types";

export async function hashPin(pin: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(pin + "::sarathi-salt-v1");
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function verifyPin(
  pin: string,
  storedHash: string
): Promise<boolean> {
  const hash = await hashPin(pin);
  return hash === storedHash;
}

export function getStoredLanguage(): Language {
  const stored = localStorage.getItem("sarathi.language");
  if (stored === "en" || stored === "hi" || stored === "te") return stored;
  return "en";
}

export function setStoredLanguage(lang: Language): void {
  localStorage.setItem("sarathi.language", lang);
}
