"use client";

import { useLang } from "./LangProvider";

export function LangToggle({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  const { lang, setLang } = useLang();
  const base = dark ? "border-ivory/30 text-ivory" : "border-ink/20 text-ink";
  return (
    <div className={`flex rounded-full border p-1 ${base} ${className}`} role="radiogroup" aria-label="भाषा / Language">
      {(["hi", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          role="radio"
          aria-checked={lang === l}
          onClick={() => setLang(l)}
          className={`min-w-11 rounded-full px-3 py-2 text-sm font-semibold transition-colors ${
            lang === l ? (dark ? "bg-ivory text-ink" : "bg-ink text-ivory") : "opacity-70 hover:opacity-100"
          }`}
        >
          {l === "hi" ? "हिं" : "EN"}
        </button>
      ))}
    </div>
  );
}
