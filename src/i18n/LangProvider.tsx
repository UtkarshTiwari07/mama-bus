"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

export type Lang = "hi" | "en";
export type Bi = { hi: string; en: string };

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: "hi", setLang: () => {} });

export const STORAGE_KEY = "ssb-lang";

/** Hindi is the default. A saved English choice is applied by the boot script before paint. */
export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("hi");

  useEffect(() => {
    if (document.documentElement.lang === "en") setLangState("en");
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    document.documentElement.lang = l;
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {}
  }, []);

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);

/** Pick the right half of a { hi, en } pair. */
export function useT() {
  const { lang } = useLang();
  return useCallback((b: Bi | string) => (typeof b === "string" ? b : b[lang]), [lang]);
}
