"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Locale, MessageKey, termsHe, ui } from "./messages";

const STORAGE_KEY = "samurai-locale";

let currentLocale: Locale = "he";

function readStoredLocale(): Locale {
  if (typeof window === "undefined") return "he";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "en" || stored === "he" ? stored : "he";
}

function applyDocumentLocale(locale: Locale) {
  currentLocale = locale;
  if (typeof document === "undefined") return;
  document.documentElement.lang = locale === "he" ? "he" : "en";
  document.documentElement.dir = locale === "he" ? "rtl" : "ltr";
}

export function getLocale() {
  return currentLocale;
}

export function t(key: MessageKey, vars?: Record<string, string | number>) {
  const table = ui[currentLocale];
  let value: string = table[key] ?? ui.en[key] ?? key;
  if (vars) {
    for (const [name, replacement] of Object.entries(vars)) {
      value = value.replaceAll(`{${name}}`, String(replacement));
    }
  }
  return value;
}

export function localize(value: string | number | null | undefined) {
  if (value == null || value === "") return "";
  const text = String(value);
  if (currentLocale !== "he") return text;
  return termsHe[text] ?? text;
}

type I18nContextValue = {
  locale: Locale;
  dir: "rtl" | "ltr";
  setLocale: (locale: Locale) => void;
  t: typeof t;
  localize: typeof localize;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("he");

  useEffect(() => {
    const next = readStoredLocale();
    applyDocumentLocale(next);
    setLocaleState(next);
  }, []);

  const setLocale = (next: Locale) => {
    applyDocumentLocale(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    setLocaleState(next);
  };

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      dir: locale === "he" ? "rtl" : "ltr",
      setLocale,
      t,
      localize,
    }),
    [locale]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    return {
      locale: currentLocale,
      dir: currentLocale === "he" ? "rtl" : "ltr",
      setLocale: () => undefined,
      t,
      localize,
    } satisfies I18nContextValue;
  }
  return context;
}
