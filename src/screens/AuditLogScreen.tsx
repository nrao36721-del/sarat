import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLiveQuery } from "dexie-react-hooks";
import AppLayout from "../components/AppLayout";
import { useApp } from "../context/AppContext";
import { getAuditLogs } from "../lib/audit";
import type { AuditLog } from "../types";

export default function AuditLogScreen() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { helper } = useApp();

  const logs = useLiveQuery(
    () => (helper ? getAuditLogs(helper.id) : Promise.resolve([])),
    [helper?.id]
  ) as AuditLog[] | undefined;

  if (!helper) {
    navigate("/welcome", { replace: true });
    return null;
  }

  return (
    <AppLayout showBack title={t("auditLog.title")}>
      <div className="mx-auto max-w-md">
        {logs && logs.length > 0 ? (
          <div className="space-y-2">
            {logs.map((log) => (
              <div key={log.id} className="rounded-xl bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-saffron-800">
                    {t(`auditLog.actions.${log.action}`, log.action)}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(log.timestamp).toLocaleString()}
                  </p>
                </div>
                {log.details && (
                  <p className="mt-1 text-xs text-gray-500">{log.details}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="rounded-xl bg-white p-8 text-center text-sm text-gray-400 shadow-sm">
            {t("auditLog.empty")}
          </p>
        )}
      </div>
    </AppLayout>
  );
}
