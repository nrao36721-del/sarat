import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AppLayout from "../components/AppLayout";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { useApp } from "../context/AppContext";
import { hashPin, verifyPin } from "../lib/crypto";
import { updateHelperProfile, deleteHelperProfile } from "../lib/registration";
import { logAction } from "../lib/audit";

export default function SettingsScreen() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { helper, setHelper } = useApp();

  const [showPinChange, setShowPinChange] = useState(false);
  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmNewPin, setConfirmNewPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [pinSuccess, setPinSuccess] = useState("");

  if (!helper) {
    navigate("/welcome", { replace: true });
    return null;
  }

  const handleChangePin = async () => {
    setPinError("");
    setPinSuccess("");
    if (!helper) return;

    const ok = await verifyPin(currentPin, helper.pinHash);
    if (!ok) {
      setPinError(t("settings.currentPinWrong"));
      return;
    }
    if (newPin.length !== 4 || !/^\d{4}$/.test(newPin)) {
      setPinError(t("register.pinLength"));
      return;
    }
    if (newPin !== confirmNewPin) {
      setPinError(t("register.pinMismatch"));
      return;
    }

    const newHash = await hashPin(newPin);
    await updateHelperProfile({ pinHash: newHash });
    await logAction(helper.id, "pin_changed", "");
    setPinSuccess(t("settings.pinChanged"));
    setCurrentPin("");
    setNewPin("");
    setConfirmNewPin("");
    setTimeout(() => {
      setShowPinChange(false);
      setPinSuccess("");
    }, 2000);
  };

  const handleLogout = async () => {
    await deleteHelperProfile();
    setHelper(null);
    navigate("/welcome", { replace: true });
  };

  const inputClass =
    "w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-saffron-800 transition-colors focus:border-saffron-500 focus:outline-none";
  const labelClass = "mb-1.5 block text-sm font-medium text-saffron-700";

  return (
    <AppLayout showBack title={t("settings.title")}>
      <div className="mx-auto max-w-md space-y-4">
        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="mb-3 text-sm font-bold uppercase text-saffron-500">
            {t("settings.helperDetails")}
          </h2>
          <dl className="space-y-1.5 text-sm">
            <div className="flex justify-between"><dt className="text-gray-500">{t("register.fullName")}</dt><dd className="font-medium text-saffron-800">{helper.fullName}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-500">{t("register.phoneNumber")}</dt><dd className="font-medium text-saffron-800">{helper.phoneNumber}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-500">{t("register.helperType")}</dt><dd className="font-medium text-saffron-800">{t(`register.helperTypes.${helper.helperType}`)}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-500">{t("register.village")}</dt><dd className="font-medium text-saffron-800">{helper.village}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-500">{t("register.district")}</dt><dd className="font-medium text-saffron-800">{helper.district}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-500">{t("register.state")}</dt><dd className="font-medium text-saffron-800">{helper.state}</dd></div>
          </dl>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="mb-3 text-sm font-bold uppercase text-saffron-500">
            {t("settings.changeLanguage")}
          </h2>
          <LanguageSwitcher />
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <button
            onClick={() => setShowPinChange(!showPinChange)}
            className="flex w-full items-center justify-between"
          >
            <span className="font-semibold text-saffron-800">{t("settings.changePin")}</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d={showPinChange ? "M6 9l6 6 6-6" : "M9 6l6 6-6 6"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {showPinChange && (
            <div className="mt-4 space-y-3">
              <div>
                <label className={labelClass}>{t("settings.currentPin")}</label>
                <input className={inputClass} type="password" inputMode="numeric" maxLength={4} value={currentPin} onChange={(e) => setCurrentPin(e.target.value.replace(/\D/g, ""))} placeholder="••••" />
              </div>
              <div>
                <label className={labelClass}>{t("settings.newPin")}</label>
                <input className={inputClass} type="password" inputMode="numeric" maxLength={4} value={newPin} onChange={(e) => setNewPin(e.target.value.replace(/\D/g, ""))} placeholder="••••" />
              </div>
              <div>
                <label className={labelClass}>{t("settings.confirmNewPin")}</label>
                <input className={inputClass} type="password" inputMode="numeric" maxLength={4} value={confirmNewPin} onChange={(e) => setConfirmNewPin(e.target.value.replace(/\D/g, ""))} placeholder="••••" />
              </div>
              {pinError && <p className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600">{pinError}</p>}
              {pinSuccess && <p className="rounded-lg bg-green-50 px-4 py-2 text-sm font-medium text-green-600">{pinSuccess}</p>}
              <button onClick={handleChangePin} className="w-full rounded-xl bg-saffron-600 px-6 py-3 text-sm font-bold text-white shadow-md">
                {t("settings.change")}
              </button>
            </div>
          )}
        </div>

        <button
          onClick={() => navigate("/audit-log")}
          className="flex w-full items-center justify-between rounded-2xl bg-white p-5 text-left shadow-sm transition-colors hover:bg-saffron-100"
        >
          <span className="font-semibold text-saffron-800">{t("settings.viewLog")}</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="rounded-2xl bg-white p-5 shadow-sm">
          <h2 className="mb-2 text-sm font-bold uppercase text-saffron-500">{t("settings.about")}</h2>
          <p className="text-xs text-gray-500">{t("settings.aboutText")}</p>
        </div>

        <button
          onClick={handleLogout}
          className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-sm font-medium text-gray-400 transition-colors hover:border-red-300 hover:text-red-500"
        >
          {t("settings.logOut")}
        </button>
      </div>
    </AppLayout>
  );
}
