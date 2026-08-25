import { type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import OfflineIndicator from "./OfflineIndicator";

interface AppLayoutProps {
  children: ReactNode;
  showBack?: boolean;
  showLanguage?: boolean;
  showOffline?: boolean;
  title?: string;
}

export default function AppLayout({
  children,
  showBack = false,
  showLanguage = false,
  showOffline = false,
  title,
}: AppLayoutProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex min-h-full flex-col bg-saffron-50">
      <header className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          {showBack && (
            <button
              onClick={() => navigate(-1)}
              className="rounded-full p-2 text-saffron-700 transition-colors hover:bg-saffron-100"
              aria-label={t("common.back")}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 18l-6-6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
          {title && (
            <h1 className="text-lg font-bold text-saffron-800">{title}</h1>
          )}
        </div>
        <div className="flex items-center gap-3">
          {showOffline && <OfflineIndicator />}
          {showLanguage && <LanguageSwitcher compact />}
        </div>
      </header>
      <main className="flex-1 overflow-y-auto px-4 pb-6">{children}</main>
    </div>
  );
}
