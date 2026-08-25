import type { Language } from "../types";

export function generateSms(
  lang: Language,
  name: string,
  schemeNames: string[],
  date: Date,
  caseId: string
): string {
  const dateStr = date.toLocaleDateString(lang === "hi" ? "hi-IN" : lang === "te" ? "te-IN" : "en-IN");
  const schemesStr = schemeNames.join(", ");

  switch (lang) {
    case "hi":
      return `प्रिय ${name || "जी"}, आपका ${schemesStr} आवेदन ${dateStr} को जमा किया गया है। कृपया 15 दिन प्रतीक्षा करें। यदि कोई सूचना न मिले तो अपने सहायक से मिलें। केस आईडी: ${caseId}`;
    case "te":
      return `ప్రియమైన ${name || "గారు"}, మీ ${schemesStr} దరఖాస్తు ${dateStr} న సమర్పించబడింది. దయచేసి 15 రోజులు వేచి ఉండండి. సమాచారం రాకపోతే మీ సహాయకుడిని కలవండి. కేస్ ID: ${caseId}`;
    default:
      return `Dear ${name || "Madam"}, your ${schemesStr} application was submitted on ${dateStr}. Please wait 15 days. If no update, contact your helper. Case ID: ${caseId}`;
  }
}

export function sendSms(_phone: string, _message: string): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), 500);
  });
}
