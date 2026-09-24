"use client";

import { useEffect, useState } from "react";

// First visit per session: the name of the land writes itself, then the curtain lifts.
export function Preloader() {
  const [state, setState] = useState<"show" | "leave" | "done">("show");

  useEffect(() => {
    // The boot script in layout.tsx marks repeat visits before first paint.
    if (document.documentElement.classList.contains("intro-seen")) {
      setState("done");
      return;
    }
    try {
      sessionStorage.setItem("ssb-intro", "1");
    } catch {}
    const t1 = setTimeout(() => setState("leave"), 1900);
    const t2 = setTimeout(() => setState("done"), 2900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (state === "done") return null;
  return (
    <div
      className={`preloader fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink text-ivory transition-[clip-path] duration-1000 ease-out-expo ${state === "leave" ? "[clip-path:inset(0_0_100%_0)]" : "[clip-path:inset(0_0_0_0)]"}`}
      aria-hidden="true"
    >
      <p className="hindi animate-[intro_1.4s_cubic-bezier(0.16,1,0.3,1)_both] text-[22vw] leading-none text-turmeric md:text-[12rem]">बिहार</p>
      <p className="eyebrow mt-6 animate-[intro_1.4s_0.35s_cubic-bezier(0.16,1,0.3,1)_both] text-ivory/70">Shri Shyam Baba · Tour &amp; Travels</p>
      <style>{`@keyframes intro{from{opacity:0;transform:translateY(40px);filter:blur(12px)}to{opacity:1;transform:none;filter:none}}`}</style>
    </div>
  );
}
