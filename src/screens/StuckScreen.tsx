import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AppLayout from "../components/AppLayout";
import { useApp } from "../context/AppContext";
import { db } from "../lib/db";
import { generateCaseId, logAction } from "../lib/audit";
import type { StuckReason, MaritalStatus, BplStatus } from "../types";

interface LocationState {
  answers: {
    name: string;
    age: number;
    village: string;
    district: string;
    maritalStatus: MaritalStatus;
    bplStatus: BplStatus;
  };
}

export default function StuckScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { helper } = useApp();

  const state = location.state as LocationState | null;
  const [reason, setReason] = useState<StuckReason>("fingerprint");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!state || !helper) {
    navigate("/home", { replace: true });
    return null;
  }

  const handleSubmit = async () => {
    if (reason === "other" && !note.trim()) {
      setError(t("stuck.noteRequired"));
      return;
    }
    const caseId = generateCaseId();
    const tempProfileId = `temp-${Date.now()}`;
    await db.stuckCases.add({
      id: caseId,
      profileId: tempProfileId,
      helperId: helper.id,
      reason,
      note,
      createdAt: Date.now(),
      status: "open",
    });
    await logAction(helper.id, "stuck_case_created", `${caseId}: ${reason}`);
    setSuccess(`${t("stuck.confirmation")} ${t("stuck.caseId", { id: caseId })}`);
    setTimeout(() => navigate("/home", { replace: true }), 2500);
  };

  return (
    <AppLayout showBack title={t("stuck.title")}>
      <div className="mx-auto max-w-md space-y-4">
        {success ? (
          <div className="rounded-2xl bg-green-50 p-6 text-center shadow-sm">
            <p className="text-lg font-bold text-green-600">{success}</p>
          </div>
        ) : (
          <>
            <div>
              <p className="mb-2 text-sm font-medium text-saffron-700">{t("stuck.reason")}</p>
              <div className="space-y-2">
                {(["fingerprint", "aadhaar", "rejected", "other"] as StuckReason[]).map((r) => (
                  <label key={r} className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-sm">
                    <input
                      type="radio"
                      name="stuckReason"
                      checked={reason === r}
                      onChange={() => setReason(r)}
                      className="h-5 w-5 accent-saffron-600"
                    />
                    <span className="text-sm text-saffron-800">{t(`stuck.reasons.${r}`)}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-saffron-700">{t("stuck.note")}</label>
              <textarea
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-saffron-800 focus:border-saffron-500 focus:outline-none"
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder={t("stuck.notePlaceholder")}
              />
            </div>
            {error && (
              <p className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600">{error}</p>
            )}
            <button
              onClick={handleSubmit}
              className="w-full rounded-xl bg-saffron-600 px-6 py-3.5 text-base font-bold text-white shadow-md transition-transform active:scale-95"
            >
              {t("stuck.submit")}
            </button>
          </>
        )}
      </div>
    </AppLayout>
  );
}
