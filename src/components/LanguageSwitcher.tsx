import { useTranslation } from "react-i18next";
import type { Language } from "../types";
import { useApp } from "../context/AppContext";

export default function LanguageSwitcher({
  compact = false,
}: {
  compact?: boolean;
}) {
  const { t } = useTranslation();
  const { language, changeLanguage } = useApp();

  const langs: { code: Language; label: string }[] = [
    { code: "en", label: t("common.english") },
    { code: "hi", label: t("common.hindi") },
    { code: "te", label: t("common.telugu") },
  ];

  return (
    <div className={`flex ${compact ? "gap-1" : "gap-2"}`}>
      {langs.map((l) => (
        <button
          key={l.code}
          onClick={() => changeLanguage(l.code)}
          className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
            language === l.code
              ? "bg-saffron-600 text-white"
              : "bg-saffron-100 text-saffron-700 hover:bg-saffron-200"
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
