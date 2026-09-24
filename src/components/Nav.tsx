"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { nav, site } from "@/content/site";
import { telLink, waLink } from "@/lib/whatsapp";
import { Sun } from "./Madhubani";
import { LangToggle, T } from "@/i18n/T";
import { PhoneIcon } from "./Icons";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8 md:pt-6">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4">
          <Link
            href="/"
            className={`flex items-center gap-2.5 rounded-full bg-ivory/85 px-3 py-2 backdrop-blur-md transition-shadow duration-500 ${scrolled ? "shadow-[0_8px_30px_-12px_rgb(22_48_42/0.35)]" : ""}`}
            aria-label={`${site.name} — home`}
          >
            <Sun className="size-8 text-sindoor" />
            <span className="leading-none">
              <span className="block text-[0.8rem] font-semibold tracking-[0.22em]">SHRI SHYAM BABA</span>
              <span className="hindi block text-[0.75rem] text-ink/70">श्री श्याम बाबा टूर एंड ट्रेवल्स</span>
            </span>
          </Link>

          <nav
            className="hidden items-center rounded-full border border-ink/10 bg-ivory/70 p-1.5 pl-6 shadow-[0_8px_40px_-12px_rgb(22_48_42/0.25)] backdrop-blur-md lg:flex"
            aria-label="Main"
          >
            <ul className="flex items-center gap-6">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="eyebrow group relative py-2 text-ink/80 transition-colors hover:text-ink">
                    <T b={item.label} />
                    <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-sindoor transition-transform duration-500 ease-out-expo group-hover:scale-x-100" />
                  </Link>
                </li>
              ))}
            </ul>
            <LangToggle className="ml-5" />
            <a href={telLink} className="ml-2 flex items-center gap-2 rounded-full bg-sindoor px-5 py-3 font-bold text-ivory transition-colors hover:bg-ink" aria-label={`Call ${site.phone}`}>
              <PhoneIcon className="size-5" /> {site.phone}
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="relative z-[70] flex size-12 items-center justify-center rounded-full bg-ink text-ivory lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span className={`absolute h-px w-5 bg-current transition-transform duration-500 ${open ? "rotate-45" : "-translate-y-1"}`} />
            <span className={`absolute h-px w-5 bg-current transition-transform duration-500 ${open ? "-rotate-45" : "translate-y-1"}`} />
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-[65] flex flex-col justify-between bg-ink px-6 pt-28 pb-10 text-ivory transition-[clip-path] duration-700 ease-out-expo lg:hidden ${open ? "[clip-path:circle(150%_at_calc(100%-2.5rem)_2.5rem)]" : "pointer-events-none [clip-path:circle(0%_at_calc(100%-2.5rem)_2.5rem)]"}`}
        aria-hidden={!open}
      >
        <ul className="space-y-2">
          {nav.map((item, i) => (
            <li key={item.href} style={{ transitionDelay: open ? `${150 + i * 50}ms` : "0ms" }} className={`transition-all duration-700 ease-out-expo ${open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
              <Link href={item.href} onClick={() => setOpen(false)} className="font-display text-4xl" tabIndex={open ? 0 : -1}>
                <T b={item.label} />
              </Link>
            </li>
          ))}
        </ul>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="hindi text-2xl text-turmeric">{site.taglineHi}</p>
            <LangToggle dark />
          </div>
          <a href={waLink()} target="_blank" rel="noopener" tabIndex={open ? 0 : -1} className="eyebrow block rounded-full bg-sindoor px-6 py-4 text-center">
            <T hi="WhatsApp पर बुक करें" en="Book on WhatsApp" />
          </a>
          <a href={telLink} tabIndex={open ? 0 : -1} className="eyebrow block rounded-full border border-ivory/30 px-6 py-4 text-center">
            <T hi="कॉल करें" en="Call" /> {site.phone}
          </a>
        </div>
      </div>
    </>
  );
}
