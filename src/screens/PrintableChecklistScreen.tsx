import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AppLayout from "../components/AppLayout";
import { useApp } from "../context/AppContext";
import { localize } from "../lib/eligibility";

interface LocationState {
  answers: { name: string; age: number; village: string; district: string };
  missingDocs: { name: { en: string; hi: string; te: string }; source: { en: string; hi: string; te: string } }[];
}

export default function PrintableChecklistScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { language } = useApp();

  const state = location.state as LocationState | null;
  if (!state) {
    navigate("/home", { replace: true });
    return null;
  }

  const handlePrint = () => window.print();

  const handleShare = async () => {
    const text = `${t("printable.title")}\n${t("printable.name")}: ${state.answers.name || t("printable.notProvided")}\n\n${state.missingDocs.map((d) => `${localize(d.name, language)} — ${localize(d.source, language)}`).join("\n")}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: t("printable.title"), text });
      } catch { /* user cancelled */ }
    } else {
      navigator.clipboard?.writeText(text);
    }
  };

  const handleReadAloud = () => {
    const text = `${t("printable.title")}. ${t("printable.name")}: ${state.answers.name || t("printable.notProvided")}. ${t("printable.missingDocuments")}: ${state.missingDocs.map((d) => localize(d.name, language)).join(", ")}. ${t("printable.instructionsText")}`;
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = language === "hi" ? "hi-IN" : language === "te" ? "te-IN" : "en-IN";
    speechSynthesis.speak(utter);
  };

  return (
    <AppLayout showBack title={t("printable.title")}>
      <div className="mx-auto max-w-md">
        <div className="rounded-2xl bg-white p-6 shadow-sm print:shadow-none">
          <h2 className="mb-4 text-center text-xl font-bold text-saffron-800">
            {t("printable.title")}
          </h2>
          <p className="mb-4 text-sm text-saffron-700">
            <span className="font-semibold">{t("printable.name")}: </span>
            {state.answers.name || t("printable.notProvided")}
          </p>

          {state.missingDocs.length === 0 ? (
            <p className="text-center text-sm text-green-600">
              {t("printable.noMissingDocs")}
            </p>
          ) : (
            <>
              <h3 className="mb-2 text-sm font-bold uppercase text-saffron-500">
                {t("printable.missingDocuments")}
              </h3>
              <table className="mb-4 w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-2 text-left font-semibold text-saffron-700">{t("documents.document")}</th>
                    <th className="py-2 text-left font-semibold text-saffron-700">{t("documents.whereToGet")}</th>
                  </tr>
                </thead>
                <tbody>
                  {state.missingDocs.map((doc, i) => (
                    <tr key={i} className="border-b border-gray-100">
                      <td className="py-2 text-saffron-800">{localize(doc.name, language)}</td>
                      <td className="py-2 text-gray-500">{localize(doc.source, language)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          <div className="rounded-xl bg-saffron-50 p-4">
            <h3 className="mb-1 text-sm font-bold text-saffron-600">
              {t("printable.instructions")}
            </h3>
            <p className="text-xs text-saffron-700">
              {t("printable.instructionsText")}
            </p>
          </div>
        </div>

        <div className="mt-4 flex gap-3 print:hidden">
          <button
            onClick={handlePrint}
            className="flex-1 rounded-xl bg-saffron-600 px-4 py-3 text-sm font-bold text-white shadow-md"
          >
            {t("printable.print")}
          </button>
          <button
            onClick={handleShare}
            className="flex-1 rounded-xl border-2 border-saffron-500 bg-white px-4 py-3 text-sm font-bold text-saffron-600"
          >
            {t("printable.share")}
          </button>
          <button
            onClick={handleReadAloud}
            className="flex-1 rounded-xl border-2 border-saffron-500 bg-white px-4 py-3 text-sm font-bold text-saffron-600"
          >
            {t("printable.readAloud")}
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
