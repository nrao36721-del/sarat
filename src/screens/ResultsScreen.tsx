import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AppLayout from "../components/AppLayout";
import { useApp } from "../context/AppContext";
import { checkEligibility, localize } from "../lib/eligibility";
import type { MaritalStatus, BplStatus } from "../types";

interface LocationState {
  answers: {
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
  };
  state: string;
}

export default function ResultsScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { language } = useApp();

  const state = location.state as LocationState | null;
  if (!state) {
    navigate("/home", { replace: true });
    return null;
  }

  const matches = checkEligibility(state.answers);

  return (
    <AppLayout showBack showLanguage title={t("results.title")}>
      <div className="mx-auto max-w-md space-y-4">
        {matches.length === 0 ? (
          <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
            <p className="text-lg font-semibold text-saffron-700">
              {t("results.noMatches")}
            </p>
            <p className="mt-2 text-sm text-gray-500">
              {t("results.noMatchesHelp")}
            </p>
          </div>
        ) : (
          <>
            <p className="text-sm font-medium text-saffron-600">
              {matches.length} {t("results.matchedSchemes")}
            </p>
            {matches.map((m) => (
              <div
                key={m.scheme.id}
                className="overflow-hidden rounded-2xl bg-white shadow-sm"
              >
                <div className="p-4">
                  <span className="mb-2 inline-block rounded-full bg-saffron-100 px-3 py-1 text-xs font-semibold text-saffron-600">
                    {t(`results.category.${m.scheme.category}`)}
                  </span>
                  <h3 className="text-base font-bold text-saffron-800">
                    {localize(m.scheme.name, language)}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-saffron-600">
                    {localize(m.scheme.benefit, language)}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {t("results.whereToApply")}: {localize(m.scheme.whereToApply, language)}
                  </p>
                  {m.needsBplVerification && (
                    <p className="mt-2 rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-600">
                      {t("results.likelyEligible")}
                    </p>
                  )}
                  <details className="mt-3">
                    <summary className="cursor-pointer text-sm font-medium text-saffron-600">
                      {t("results.requiredDocuments")}
                    </summary>
                    <ul className="mt-2 space-y-1">
                      {m.scheme.documentsRequired.map((doc, i) => (
                        <li key={i} className="text-xs text-gray-600">
                          {localize(doc.name, language)}
                        </li>
                      ))}
                    </ul>
                  </details>
                </div>
              </div>
            ))}
          </>
        )}

        {matches.length > 0 && (
          <button
            onClick={() => navigate("/documents", { state: { answers: state.answers, matches: matches.map((m) => m.scheme.id), stateName: state.state } })}
            className="w-full rounded-xl bg-saffron-600 px-6 py-3.5 text-base font-bold text-white shadow-md transition-transform active:scale-95"
          >
            {t("results.checkDocuments")}
          </button>
        )}

        <button
          onClick={() => navigate("/stuck", { state: { answers: state.answers } })}
          className="w-full rounded-xl border-2 border-red-300 bg-red-50 px-6 py-3 text-sm font-bold text-red-600 transition-colors hover:bg-red-100"
        >
          {t("results.stuck")}
        </button>
      </div>
    </AppLayout>
  );
}
