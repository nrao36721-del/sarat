import { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AppLayout from "../components/AppLayout";
import { useApp } from "../context/AppContext";
import { SCHEMES } from "../lib/schemes";
import { consolidateDocuments, localize } from "../lib/eligibility";
import { logAction } from "../lib/audit";
import { db } from "../lib/db";
import type { WidowProfile, DocumentEntry, MaritalStatus, BplStatus } from "../types";

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
  matches: string[];
  stateName: string;
}

export default function DocumentChecklistScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { helper, language } = useApp();

  const state = location.state as LocationState | null;
  if (!state) {
    navigate("/home", { replace: true });
    return null;
  }

  const matchedSchemes = SCHEMES.filter((s) => state.matches.includes(s.id));
  const docs = useMemo(() => consolidateDocuments(matchedSchemes), [matchedSchemes]);

  const [docStatus, setDocStatus] = useState<Record<string, boolean>>(
    () => Object.fromEntries(docs.map((d) => [d.name.en, false]))
  );

  const missingDocs = docs.filter((d) => !docStatus[d.name.en]);

  const handleSaveProfile = async () => {
    if (!helper) return;

    const now = Date.now();
    const profile: WidowProfile = {
      id: crypto.randomUUID(),
      helperId: helper.id,
      name: state.answers.name,
      age: state.answers.age,
      phone: state.answers.phone,
      village: state.answers.village,
      district: state.answers.district,
      maritalStatus: state.answers.maritalStatus,
      bplStatus: state.answers.bplStatus,
      hasAadhaar: state.answers.hasAadhaar,
      hasDeathCertificate: state.answers.hasDeathCertificate,
      hasBankAccount: state.answers.hasBankAccount,
      languagePreference: language,
      documents: docs.map((d) => ({
        name: d.name,
        hasIt: docStatus[d.name.en] ?? false,
        source: d.source,
      })) as DocumentEntry[],
      applications: matchedSchemes.map((s) => ({
        schemeId: s.id,
        dateApplied: 0,
        status: "pending" as const,
      })),
      createdAt: now,
      updatedAt: now,
    };

    await db.widows.add(profile);
    await logAction(helper.id, "profile_saved", state.answers.name || `Age ${state.answers.age}`);
    navigate(`/profile/${profile.id}`, { replace: true });
  };

  const handleGenerate = () => {
    if (helper) logAction(helper.id, "checklist_generated", `${missingDocs.length} missing docs`);
    navigate("/printable", { state: { answers: state.answers, missingDocs } });
  };

  return (
    <AppLayout showBack showLanguage title={t("documents.title")}>
      <div className="mx-auto max-w-md space-y-3">
        {docs.length === 0 ? (
          <p className="rounded-xl bg-white p-4 text-center text-sm text-gray-400">
            {t("documents.allDocsAvailable")}
          </p>
        ) : (
          docs.map((doc) => {
            const has = docStatus[doc.name.en] ?? false;
            return (
              <div
                key={doc.name.en}
                className={`rounded-xl p-4 shadow-sm transition-colors ${
                  has ? "bg-green-50" : "bg-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-saffron-800">
                      {localize(doc.name, language)}
                    </p>
                    {!has && (
                      <p className="mt-0.5 text-xs text-gray-500">
                        {t("documents.whereToGet")}: {localize(doc.source, language)}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setDocStatus((s) => ({ ...s, [doc.name.en]: true }))}
                      className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
                        has ? "bg-green-500 text-white" : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {t("newCheck.yes")}
                    </button>
                    <button
                      onClick={() => setDocStatus((s) => ({ ...s, [doc.name.en]: false }))}
                      className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
                        !has ? "bg-red-400 text-white" : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {t("newCheck.no")}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}

        {missingDocs.length > 0 && (
          <div className="rounded-xl bg-amber-50 p-3 text-center">
            <p className="text-sm font-medium text-amber-600">
              {missingDocs.length} {t("documents.missing")}
            </p>
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <button
            onClick={handleGenerate}
            className="flex-1 rounded-xl border-2 border-saffron-500 bg-white px-4 py-3 text-sm font-bold text-saffron-600 transition-colors hover:bg-saffron-50"
          >
            {t("documents.generateChecklist")}
          </button>
          <button
            onClick={handleSaveProfile}
            className="flex-1 rounded-xl bg-saffron-600 px-4 py-3 text-sm font-bold text-white shadow-md transition-transform active:scale-95"
          >
            {t("documents.saveProfile")}
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
