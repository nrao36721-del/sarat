import { useTranslation } from "react-i18next";
import { useApp } from "../context/AppContext";

export default function OfflineIndicator() {
  const { t } = useTranslation();
  const { isOnline } = useApp();

  return (
    <div className="flex items-center gap-1.5">
      <span
        className={`h-2.5 w-2.5 rounded-full ${
          isOnline ? "bg-green-500" : "bg-gray-400"
        }`}
      />
      <span className="text-sm font-medium text-saffron-700">
        {isOnline ? t("home.online") : t("home.offline")}
      </span>
    </div>
  );
}
