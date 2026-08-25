import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AppLayout from "../components/AppLayout";
import PINInput from "../components/PINInput";
import { useApp } from "../context/AppContext";
import { verifyPin } from "../lib/crypto";
import { updateHelperProfile } from "../lib/registration";
import { logAction } from "../lib/audit";

export default function LoginScreen() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { helper, setHelper } = useApp();

  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [showForgot, setShowForgot] = useState(false);

  if (!helper) {
    navigate("/welcome", { replace: true });
    return null;
  }

  const handleLogin = async () => {
    if (pin.length !== 4) return;
    const ok = await verifyPin(pin, helper.pinHash);
    if (ok) {
      await updateHelperProfile({ lastLoginAt: Date.now() });
      await logAction(helper.id, "helper_login", helper.fullName);
      setHelper({ ...helper, lastLoginAt: Date.now() });
      navigate("/home", { replace: true });
    } else {
      setError(true);
      setPin("");
    }
  };

  return (
    <AppLayout showLanguage title={t("login.title")}>
      <div className="mx-auto flex max-w-md flex-col items-center pt-8">
        <p className="mb-8 text-lg font-medium text-saffron-700">
          {t("login.subtitle", { name: helper.fullName })}
        </p>

        <div className="mb-8">
          <PINInput
            value={pin}
            onChange={(v) => {
              setPin(v);
              setError(false);
            }}
            onComplete={handleLogin}
            error={error}
          />
        </div>

        {error && (
          <p className="mb-4 rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600">
            {t("login.wrongPin")}
          </p>
        )}

        <button
          onClick={handleLogin}
          disabled={pin.length !== 4}
          className="w-full max-w-xs rounded-xl bg-saffron-600 px-6 py-3.5 text-base font-bold text-white shadow-md transition-transform active:scale-95 disabled:opacity-50"
        >
          {t("common.confirm")}
        </button>

        <button
          onClick={() => setShowForgot(true)}
          className="mt-6 text-sm font-medium text-saffron-600 underline"
        >
          {t("login.forgotPin")}
        </button>

        {showForgot && (
          <div className="mt-4 max-w-xs rounded-xl bg-saffron-100 p-4 text-center">
            <p className="mb-3 text-sm text-saffron-800">
              {t("login.forgotPinMessage")}
            </p>
            <button
              onClick={() => navigate("/register", { replace: true })}
              className="rounded-lg bg-saffron-600 px-4 py-2 text-sm font-bold text-white"
            >
              {t("login.reregister")}
            </button>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
