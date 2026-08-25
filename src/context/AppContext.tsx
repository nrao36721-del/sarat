import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { HelperProfile, Language } from "../types";
import { getHelperProfile } from "../lib/registration";
import { getStoredLanguage, setStoredLanguage } from "../lib/crypto";
import i18n from "../lib/i18n";

interface AppContextValue {
  helper: HelperProfile | null;
  setHelper: (h: HelperProfile | null) => void;
  isOnline: boolean;
  language: Language;
  changeLanguage: (lang: Language) => void;
  loading: boolean;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [helper, setHelper] = useState<HelperProfile | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [language, setLanguage] = useState<Language>(getStoredLanguage());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHelperProfile().then((h) => {
      setHelper(h);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const on = () => setIsOnline(true);
    const off = () => setIsOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);

  const changeLanguage = useCallback((lang: Language) => {
    setLanguage(lang);
    setStoredLanguage(lang);
    i18n.changeLanguage(lang);
  }, []);

  return (
    <AppContext.Provider
      value={{ helper, setHelper, isOnline, language, changeLanguage, loading }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
