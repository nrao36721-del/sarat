import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AppLayout from "../components/AppLayout";
import { useApp } from "../context/AppContext";
import { hashPin } from "../lib/crypto";
import { saveHelperProfile } from "../lib/registration";
import { DISTRICTS, getStateForDistrict } from "../lib/districts";
import { logAction } from "../lib/audit";
import type { HelperType, HelperProfile } from "../types";

export default function RegisterScreen() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setHelper, language } = useApp();

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [helperType, setHelperType] = useState<HelperType>("csc");
  const [village, setVillage] = useState("");
  const [district, setDistrict] = useState("");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [consent1, setConsent1] = useState(false);
  const [consent2, setConsent2] = useState(false);
  const [error, setError] = useState("");

  const state = getStateForDistrict(district);

  const handleSubmit = async () => {
    setError("");

    if (!fullName || !phoneNumber || !village || !district) {
      setError(t("register.fillAllFields"));
      return;
    }
    if (pin.length !== 4 || !/^\d{4}$/.test(pin)) {
      setError(t("register.pinLength"));
      return;
    }
    if (pin !== confirmPin) {
      setError(t("register.pinMismatch"));
      return;
    }
    if (!consent1 || !consent2) {
      setError(t("register.consentRequired"));
      return;
    }

    const pinHash = await hashPin(pin);
    const now = Date.now();
    const profile: HelperProfile = {
      id: crypto.randomUUID(),
      fullName,
      phoneNumber,
      helperType,
      village,
      district,
      state,
      pinHash,
      languagePreference: language,
      createdAt: now,
      lastLoginAt: now,
    };

    await saveHelperProfile(profile);
    await logAction(profile.id, "helper_registered", fullName);
    setHelper(profile);
    navigate("/login", { replace: true });
  };

  const inputClass =
    "w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-saffron-800 transition-colors focus:border-saffron-500 focus:outline-none";
  const labelClass = "mb-1.5 block text-sm font-medium text-saffron-700";

  return (
    <AppLayout showBack showLanguage title={t("register.title")}>
      <div className="mx-auto max-w-md space-y-5">
        <div>
          <label className={labelClass}>{t("register.fullName")}</label>
          <input
            className={inputClass}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder={t("register.fullNamePlaceholder")}
          />
        </div>

        <div>
          <label className={labelClass}>{t("register.phoneNumber")}</label>
          <input
            className={inputClass}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder={t("register.phoneNumberPlaceholder")}
            inputMode="numeric"
            maxLength={10}
          />
        </div>

        <div>
          <label className={labelClass}>{t("register.helperType")}</label>
          <select
            className={inputClass}
            value={helperType}
            onChange={(e) => setHelperType(e.target.value as HelperType)}
          >
            {(["csc", "anganwadi", "asha", "panchayat", "ngo", "other"] as HelperType[]).map(
              (ht) => (
                <option key={ht} value={ht}>
                  {t(`register.helperTypes.${ht}`)}
                </option>
              )
            )}
          </select>
        </div>

        <div>
          <label className={labelClass}>{t("register.village")}</label>
          <input
            className={inputClass}
            value={village}
            onChange={(e) => setVillage(e.target.value)}
            placeholder={t("register.villagePlaceholder")}
          />
        </div>

        <div>
          <label className={labelClass}>{t("register.district")}</label>
          <select
            className={inputClass}
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          >
            <option value="">{t("register.selectDistrict")}</option>
            {DISTRICTS.map((d) => (
              <option key={d.name} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        {state && (
          <div>
            <label className={labelClass}>{t("register.state")}</label>
            <input className={inputClass} value={state} readOnly />
          </div>
        )}

        <div>
          <label className={labelClass}>{t("register.createPin")}</label>
          <input
            className={inputClass}
            type="password"
            inputMode="numeric"
            maxLength={4}
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
            placeholder="••••"
          />
        </div>

        <div>
          <label className={labelClass}>{t("register.confirmPin")}</label>
          <input
            className={inputClass}
            type="password"
            inputMode="numeric"
            maxLength={4}
            value={confirmPin}
            onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, ""))}
            placeholder="••••"
          />
        </div>

        <div className="space-y-3 rounded-xl bg-saffron-100 p-4">
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={consent1}
              onChange={(e) => setConsent1(e.target.checked)}
              className="mt-1 h-5 w-5 accent-saffron-600"
            />
            <span className="text-sm text-saffron-800">
              {t("register.consent1")}
            </span>
          </label>
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={consent2}
              onChange={(e) => setConsent2(e.target.checked)}
              className="mt-1 h-5 w-5 accent-saffron-600"
            />
            <span className="text-sm text-saffron-800">
              {t("register.consent2")}
            </span>
          </label>
        </div>

        {error && (
          <p className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600">
            {error}
          </p>
        )}

        <button
          onClick={handleSubmit}
          className="w-full rounded-xl bg-saffron-600 px-6 py-3.5 text-base font-bold text-white shadow-md transition-transform active:scale-95"
        >
          {t("register.submit")}
        </button>
      </div>
    </AppLayout>
  );
}
