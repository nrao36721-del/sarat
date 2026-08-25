import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLiveQuery } from "dexie-react-hooks";
import AppLayout from "../components/AppLayout";
import Modal from "../components/Modal";
import { useApp } from "../context/AppContext";
import { db } from "../lib/db";
import { SCHEMES } from "../lib/schemes";
import { localize } from "../lib/eligibility";
import { generateSms, sendSms } from "../lib/sms";
import { generateCaseId, logAction } from "../lib/audit";
import type { WidowProfile, StuckReason, Language, Scheme } from "../types";

export default function ProfileScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { helper, language } = useApp();

  const profile = useLiveQuery(
    () => (id ? db.widows.get(id) : undefined),
    [id]
  ) as WidowProfile | undefined;

  const [showApplied, setShowApplied] = useState(false);
  const [showStuck, setShowStuck] = useState(false);
  const [stuckReason, setStuckReason] = useState<StuckReason>("fingerprint");
  const [stuckNote, setStuckNote] = useState("");
  const [stuckError, setStuckError] = useState("");
  const [stuckSuccess, setStuckSuccess] = useState("");
  const [selectedSchemes, setSelectedSchemes] = useState<string[]>([]);
  const [widowPhone, setWidowPhone] = useState("");
  const [smsLang, setSmsLang] = useState<Language>(language);
  const [appliedError, setAppliedError] = useState("");
  const [appliedSuccess, setAppliedSuccess] = useState("");

  if (!profile) {
    if (id !== undefined) navigate("/home", { replace: true });
    return null;
  }

  const matchedSchemes = SCHEMES.filter((s) =>
    profile.applications.some((a) => a.schemeId === s.id)
  );

  const handleStuck = async () => {
    if (!helper || !profile) return;
    if (stuckReason === "other" && !stuckNote.trim()) {
      setStuckError(t("stuck.noteRequired"));
      return;
    }
    const caseId = generateCaseId();
    await db.stuckCases.add({
      id: caseId,
      profileId: profile.id,
      helperId: helper.id,
      reason: stuckReason,
      note: stuckNote,
      createdAt: Date.now(),
      status: "open",
    });
    await logAction(helper.id, "stuck_case_created", `${caseId}: ${stuckReason}`);
    setStuckError("");
    setStuckSuccess(`${t("stuck.confirmation")} ${t("stuck.caseId", { id: caseId })}`);
    setStuckNote("");
    setTimeout(() => {
      setShowStuck(false);
      setStuckSuccess("");
    }, 2500);
  };

  const handleApplied = async () => {
    if (!helper || !profile) return;
    if (selectedSchemes.length === 0) {
      setAppliedError(t("markApplied.noSchemesSelected"));
      return;
    }
    setAppliedError("");

    const now = Date.now();
    const schemeNames = selectedSchemes.map((sid) => {
      const s = SCHEMES.find((sc) => sc.id === sid);
      return s ? localize(s.name, smsLang) : sid;
    });
    const caseId = generateCaseId();
    const smsText = generateSms(smsLang, profile.name, schemeNames, new Date(now), caseId);

    if (widowPhone) {
      await sendSms(widowPhone, smsText);
    }

    const updatedApps = profile.applications.map((a) => {
      if (selectedSchemes.includes(a.schemeId)) {
        return { ...a, dateApplied: now, status: "submitted" as const, caseId };
      }
      return a;
    });

    await db.widows.update(profile.id, {
      applications: updatedApps,
      updatedAt: now,
      phone: widowPhone || profile.phone,
    });

    await logAction(helper.id, "marked_applied", selectedSchemes.join(", "));
    setAppliedSuccess(widowPhone ? t("markApplied.smsSent") : t("markApplied.appliedSuccess"));
    setTimeout(() => {
      setShowApplied(false);
      setAppliedSuccess("");
      setSelectedSchemes([]);
    }, 2000);
  };

  const handleDelete = async () => {
    if (!helper || !profile) return;
    await db.widows.delete(profile.id);
    navigate("/home", { replace: true });
  };

  return (
    <AppLayout showBack showLanguage title={t("profile.title")}>
      <div className="mx-auto max-w-md space-y-4">
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="mb-3 text-sm font-bold uppercase text-saffron-500">{t("profile.details")}</h2>
          <dl className="space-y-1.5 text-sm">
            <div className="flex justify-between"><dt className="text-gray-500">{t("newCheck.name")}</dt><dd className="font-medium text-saffron-800">{profile.name || "—"}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-500">{t("newCheck.age")}</dt><dd className="font-medium text-saffron-800">{profile.age}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-500">{t("newCheck.maritalStatus")}</dt><dd className="font-medium text-saffron-800">{t(`newCheck.${profile.maritalStatus}`)}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-500">{t("newCheck.bpl")}</dt><dd className="font-medium text-saffron-800">{t(`newCheck.${profile.bplStatus}`)}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-500">{t("newCheck.village")}</dt><dd className="font-medium text-saffron-800">{profile.village}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-500">{t("newCheck.district")}</dt><dd className="font-medium text-saffron-800">{profile.district}</dd></div>
          </dl>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="mb-3 text-sm font-bold uppercase text-saffron-500">{t("profile.matchedSchemes")}</h2>
          {matchedSchemes.length > 0 ? (
            <ul className="space-y-2">
              {matchedSchemes.map((s: Scheme) => (
                <li key={s.id} className="text-sm">
                  <p className="font-semibold text-saffron-800">{localize(s.name, language)}</p>
                  <p className="text-xs text-saffron-600">{localize(s.benefit, language)}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400">—</p>
          )}
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="mb-3 text-sm font-bold uppercase text-saffron-500">{t("profile.applicationHistory")}</h2>
          {profile.applications.filter((a) => a.dateApplied > 0).length > 0 ? (
            <ul className="space-y-2">
              {profile.applications.filter((a) => a.dateApplied > 0).map((a, i) => {
                const s = SCHEMES.find((sc) => sc.id === a.schemeId);
                return (
                  <li key={i} className="text-sm">
                    <p className="font-medium text-saffron-800">{s ? localize(s.name, language) : a.schemeId}</p>
                    <p className="text-xs text-gray-500">
                      {t("profile.appliedOn", { date: new Date(a.dateApplied).toLocaleDateString() })} · {t(`profile.status.${a.status}`)}
                      {a.caseId && ` · ${t("profile.caseId")}: ${a.caseId}`}
                    </p>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-sm text-gray-400">{t("profile.noApplications")}</p>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setShowApplied(true)}
            className="flex-1 rounded-xl bg-saffron-600 px-4 py-3 text-sm font-bold text-white shadow-md"
          >
            {t("profile.markApplied")}
          </button>
          <button
            onClick={() => setShowStuck(true)}
            className="flex-1 rounded-xl border-2 border-red-300 bg-red-50 px-4 py-3 text-sm font-bold text-red-600"
          >
            {t("profile.stuck")}
          </button>
        </div>

        <button
          onClick={handleDelete}
          className="w-full rounded-xl border-2 border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-400 transition-colors hover:border-red-300 hover:text-red-500"
        >
          {t("profile.deleteProfile")}
        </button>
      </div>

      <Modal open={showApplied} onClose={() => setShowApplied(false)} title={t("markApplied.title")}>
        <div className="space-y-4">
          {appliedSuccess ? (
            <p className="rounded-lg bg-green-50 p-4 text-center text-sm font-medium text-green-600">{appliedSuccess}</p>
          ) : (
            <>
              <div>
                <p className="mb-2 text-sm font-medium text-saffron-700">{t("markApplied.selectSchemes")}</p>
                <div className="space-y-2">
                  {matchedSchemes.map((s: Scheme) => (
                    <label key={s.id} className="flex items-center gap-3 rounded-lg bg-saffron-50 p-3">
                      <input
                        type="checkbox"
                        checked={selectedSchemes.includes(s.id)}
                        onChange={(e) => {
                          if (e.target.checked) setSelectedSchemes([...selectedSchemes, s.id]);
                          else setSelectedSchemes(selectedSchemes.filter((x) => x !== s.id));
                        }}
                        className="h-5 w-5 accent-saffron-600"
                      />
                      <span className="text-sm text-saffron-800">{localize(s.name, language)}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-saffron-700">{t("markApplied.phoneNumber")}</label>
                <input
                  className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-saffron-800 focus:border-saffron-500 focus:outline-none"
                  value={widowPhone}
                  onChange={(e) => setWidowPhone(e.target.value)}
                  placeholder={t("markApplied.phoneNumberPlaceholder")}
                  inputMode="numeric"
                  maxLength={10}
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-saffron-700">{t("markApplied.smsLanguage")}</label>
                <select
                  className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-saffron-800 focus:border-saffron-500 focus:outline-none"
                  value={smsLang}
                  onChange={(e) => setSmsLang(e.target.value as Language)}
                >
                  <option value="en">English</option>
                  <option value="hi">हिंदी</option>
                  <option value="te">తెలుగు</option>
                </select>
              </div>
              {selectedSchemes.length > 0 && (
                <div className="rounded-lg bg-saffron-50 p-3">
                  <p className="mb-1 text-xs font-semibold text-saffron-500">{t("markApplied.smsPreview")}</p>
                  <p className="text-xs text-saffron-700">
                    {generateSms(
                      smsLang,
                      profile.name,
                      selectedSchemes.map((sid) => {
                        const s = SCHEMES.find((sc) => sc.id === sid);
                        return s ? localize(s.name, smsLang) : sid;
                      }),
                      new Date(),
                      generateCaseId()
                    )}
                  </p>
                </div>
              )}
              {appliedError && (
                <p className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600">{appliedError}</p>
              )}
              <button
                onClick={handleApplied}
                className="w-full rounded-xl bg-saffron-600 px-6 py-3 text-sm font-bold text-white shadow-md"
              >
                {widowPhone ? t("markApplied.confirm") : t("markApplied.confirmNoSms")}
              </button>
            </>
          )}
        </div>
      </Modal>

      <Modal open={showStuck} onClose={() => setShowStuck(false)} title={t("stuck.title")}>
        <div className="space-y-4">
          {stuckSuccess ? (
            <p className="rounded-lg bg-green-50 p-4 text-center text-sm font-medium text-green-600">{stuckSuccess}</p>
          ) : (
            <>
              <div>
                <p className="mb-2 text-sm font-medium text-saffron-700">{t("stuck.reason")}</p>
                <div className="space-y-2">
                  {(["fingerprint", "aadhaar", "rejected", "other"] as StuckReason[]).map((r) => (
                    <label key={r} className="flex items-center gap-3 rounded-lg bg-saffron-50 p-3">
                      <input
                        type="radio"
                        name="stuckReason"
                        checked={stuckReason === r}
                        onChange={() => setStuckReason(r)}
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
                  value={stuckNote}
                  onChange={(e) => setStuckNote(e.target.value)}
                  placeholder={t("stuck.notePlaceholder")}
                />
              </div>
              {stuckError && (
                <p className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600">{stuckError}</p>
              )}
              <button
                onClick={handleStuck}
                className="w-full rounded-xl bg-saffron-600 px-6 py-3 text-sm font-bold text-white shadow-md"
              >
                {t("stuck.submit")}
              </button>
            </>
          )}
        </div>
      </Modal>
    </AppLayout>
  );
}
