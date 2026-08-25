import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLiveQuery } from "dexie-react-hooks";
import AppLayout from "../components/AppLayout";
import { useApp } from "../context/AppContext";
import { db } from "../lib/db";
import type { WidowProfile, StuckCase } from "../types";

export default function HomeScreen() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { helper, isOnline } = useApp();

  const [lastSynced, setLastSynced] = useState<string | null>(null);

  const recentWidows = useLiveQuery(
    () =>
      db.widows
        .where("helperId")
        .equals(helper?.id ?? "")
        .reverse()
        .sortBy("createdAt"),
    [helper?.id]
  ) as WidowProfile[] | undefined;

  const stuckCases = useLiveQuery(
    () =>
      db.stuckCases
        .where("helperId")
        .equals(helper?.id ?? "")
        .filter((c) => c.status === "open")
        .reverse()
        .sortBy("createdAt"),
    [helper?.id]
  ) as StuckCase[] | undefined;

  useEffect(() => {
    const stored = localStorage.getItem("sarathi.lastSynced");
    if (stored) setLastSynced(stored);
  }, []);

  if (!helper) {
    navigate("/welcome", { replace: true });
    return null;
  }

  return (
    <AppLayout showLanguage showOffline title={t("home.greeting", { name: helper.fullName })}>
      <div className="mx-auto max-w-md space-y-6">
        <div className="flex items-center justify-between rounded-xl bg-white p-3 shadow-sm">
          <span className="text-sm text-saffron-600">
            {isOnline ? t("home.online") : t("home.offline")}
          </span>
          <span className="text-xs text-gray-400">
            {lastSynced
              ? t("home.lastSynced", { time: new Date(parseInt(lastSynced)).toLocaleString() })
              : t("home.neverSynced")}
          </span>
        </div>

        <button
          onClick={() => navigate("/new-check")}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-saffron-600 px-6 py-4 text-lg font-bold text-white shadow-lg transition-transform active:scale-95"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          {t("home.newCheck")}
        </button>

        <div>
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-saffron-500">
            {t("home.recentCases")}
          </h2>
          {recentWidows && recentWidows.length > 0 ? (
            <div className="space-y-2">
              {recentWidows.slice(0, 5).map((w) => (
                <button
                  key={w.id}
                  onClick={() => navigate(`/profile/${w.id}`)}
                  className="flex w-full items-center justify-between rounded-xl bg-white p-4 text-left shadow-sm transition-colors hover:bg-saffron-100"
                >
                  <div>
                    <p className="font-semibold text-saffron-800">
                      {w.name || `Age ${w.age}`}
                    </p>
                    <p className="text-xs text-gray-400">
                      {w.village} · {new Date(w.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              ))}
            </div>
          ) : (
            <p className="rounded-xl bg-white p-4 text-center text-sm text-gray-400 shadow-sm">
              {t("home.noCases")}
            </p>
          )}
        </div>

        <div>
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-saffron-500">
            {t("home.stuckCases")}
          </h2>
          {stuckCases && stuckCases.length > 0 ? (
            <div className="space-y-2">
              {stuckCases.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between rounded-xl bg-red-50 p-4 shadow-sm"
                >
                  <div>
                    <p className="font-semibold text-red-700">{c.id}</p>
                    <p className="text-xs text-red-400">
                      {t(`stuck.reasons.${c.reason}`)} · {new Date(c.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="rounded-xl bg-white p-4 text-center text-sm text-gray-400 shadow-sm">
              {t("home.noStuckCases")}
            </p>
          )}
        </div>

        <button
          onClick={() => navigate("/settings")}
          className="flex w-full items-center gap-3 rounded-xl bg-white p-4 text-left shadow-sm transition-colors hover:bg-saffron-100"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" strokeWidth="2" />
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z" stroke="currentColor" strokeWidth="2" />
          </svg>
          <span className="font-semibold text-saffron-800">{t("home.settings")}</span>
        </button>
      </div>
    </AppLayout>
  );
}
