import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SarathiLogo from "../components/SarathiLogo";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { useApp } from "../context/AppContext";

export default function WelcomeScreen() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { helper } = useApp();

  return (
    <div className="flex h-full flex-col items-center justify-center bg-saffron-500 px-6 text-center">
      <SarathiLogo size={120} />

      <h1 className="mt-8 font-sans text-3xl font-bold text-white">
        {t("welcome.title")}
      </h1>
      <p className="mt-2 max-w-xs text-saffron-50">{t("welcome.subtitle")}</p>

      <div className="mt-10 w-full max-w-xs">
        <p className="mb-3 text-sm font-medium text-saffron-50">
          {t("welcome.selectLanguage")}
        </p>
        <div className="flex justify-center">
          <LanguageSwitcher />
        </div>
      </div>

      <button
        onClick={() => navigate("/register")}
        className="mt-10 w-full max-w-xs rounded-xl bg-white px-6 py-3.5 text-base font-bold text-saffron-700 shadow-md transition-transform active:scale-95"
      >
        {t("welcome.getStarted")}
      </button>

      {helper && (
        <button
          onClick={() => navigate("/login")}
          className="mt-4 text-sm font-medium text-saffron-50 underline"
        >
          {t("welcome.alreadyRegistered")}
        </button>
      )}
    </div>
  );
}
