import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AppLayout from "../components/AppLayout";
import { useApp } from "../context/AppContext";
import { DISTRICTS, getStateForDistrict } from "../lib/districts";
import { logAction } from "../lib/audit";
import type { MaritalStatus, BplStatus } from "../types";

export default function NewCheckScreen() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { helper } = useApp();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [maritalStatus, setMaritalStatus] = useState<MaritalStatus>("widow");
  const [bplStatus, setBplStatus] = useState<BplStatus>("yes");
  const [hasAadhaar, setHasAadhaar] = useState(true);
  const [hasDeathCertificate, setHasDeathCertificate] = useState(false);
  const [hasBankAccount, setHasBankAccount] = useState(false);
  const [village, setVillage] = useState(helper?.village ?? "");
  const [district, setDistrict] = useState(helper?.district ?? "");
  const [error, setError] = useState("");

  const state = getStateForDistrict(district);

  const handleCheck = async () => {
    if (!age || !village || !district) {
      setError(t("newCheck.fillRequired"));
      return;
    }

    const answers = {
      name,
      age: parseInt(age),
      phone: "",
      village,
      district,
      maritalStatus,
      bplStatus,
      hasAadhaar,
      hasDeathCertificate,
      hasBankAccount,
    };

    if (helper) {
      await logAction(helper.id, "eligibility_checked", `Age ${age}, ${maritalStatus}`);
    }

    navigate("/results", { state: { answers, state } });
  };

  const inputClass =
    "w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-saffron-800 transition-colors focus:border-saffron-500 focus:outline-none";
  const labelClass = "mb-1.5 block text-sm font-medium text-saffron-700";
  const btnClass =
    "flex-1 rounded-xl border-2 py-2.5 text-sm font-semibold transition-colors ";

  return (
    <AppLayout showBack showLanguage title={t("newCheck.title")}>
      <div className="mx-auto max-w-md space-y-5">
        <div>
          <label className={labelClass}>{t("newCheck.name")}</label>
          <input
            className={inputClass}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("newCheck.namePlaceholder")}
          />
        </div>

        <div>
          <label className={labelClass}>{t("newCheck.age")} *</label>
          <input
            className={inputClass}
            type="number"
            inputMode="numeric"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="35"
          />
        </div>

        <div>
          <label className={labelClass}>{t("newCheck.maritalStatus")} *</label>
          <div className="flex gap-2">
            {(["widow", "divorced", "separated"] as MaritalStatus[]).map((m) => (
              <button
                key={m}
                onClick={() => setMaritalStatus(m)}
                className={btnClass + (maritalStatus === m
                  ? "border-saffron-500 bg-saffron-50 text-saffron-700"
                  : "border-gray-200 bg-white text-gray-500")}
              >
                {t(`newCheck.${m}`)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className={labelClass}>{t("newCheck.bpl")} *</label>
          <div className="flex gap-2">
            {(["yes", "no", "unknown"] as BplStatus[]).map((b) => (
              <button
                key={b}
                onClick={() => setBplStatus(b)}
                className={btnClass + (bplStatus === b
                  ? "border-saffron-500 bg-saffron-50 text-saffron-700"
                  : "border-gray-200 bg-white text-gray-500")}
              >
                {t(`newCheck.${b}`)}
              </button>
            ))}
          </div>
        </div>

        {[{
          label: t("newCheck.hasAadhaar"),
          val: hasAadhaar,
          set: setHasAadhaar,
        }, {
          label: t("newCheck.hasDeathCertificate"),
          val: hasDeathCertificate,
          set: setHasDeathCertificate,
        }, {
          label: t("newCheck.hasBankAccount"),
          val: hasBankAccount,
          set: setHasBankAccount,
        }].map((item, i) => (
          <div key={i} className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm">
            <span className="text-sm font-medium text-saffron-800">{item.label}</span>
            <div className="flex gap-2">
              <button
                onClick={() => item.set(true)}
                className={btnClass + (item.val
                  ? "border-green-500 bg-green-50 text-green-700"
                  : "border-gray-200 bg-white text-gray-400")}
              >
                {t("newCheck.yes")}
              </button>
              <button
                onClick={() => item.set(false)}
                className={btnClass + (!item.val
                  ? "border-red-400 bg-red-50 text-red-600"
                  : "border-gray-200 bg-white text-gray-400")}
              >
                {t("newCheck.no")}
              </button>
            </div>
          </div>
        ))}

        <div>
          <label className={labelClass}>{t("newCheck.village")} *</label>
          <input
            className={inputClass}
            value={village}
            onChange={(e) => setVillage(e.target.value)}
          />
        </div>

        <div>
          <label className={labelClass}>{t("newCheck.district")} *</label>
          <select
            className={inputClass}
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          >
            <option value="">{t("register.selectDistrict")}</option>
            {DISTRICTS.map((d) => (
              <option key={d.name} value={d.name}>{d.name}</option>
            ))}
          </select>
        </div>

        {state && (
          <div>
            <label className={labelClass}>{t("register.state")}</label>
            <input className={inputClass} value={state} readOnly />
          </div>
        )}

        {error && (
          <p className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600">
            {error}
          </p>
        )}

        <button
          onClick={handleCheck}
          className="w-full rounded-xl bg-saffron-600 px-6 py-3.5 text-base font-bold text-white shadow-md transition-transform active:scale-95"
        >
          {t("newCheck.checkEligibility")}
        </button>
      </div>
    </AppLayout>
  );
}
