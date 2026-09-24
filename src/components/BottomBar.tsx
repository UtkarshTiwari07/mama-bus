"use client";

import { telLink, waLink } from "@/lib/whatsapp";
import { T, LangToggle } from "@/i18n/T";
import { PhoneIcon, WhatsAppIcon } from "./Icons";

/** Always-visible Call / WhatsApp on phones — the two things most visitors came to do. */
export function BottomBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-ivory/95 px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden">
      <div className="flex items-center gap-2">
        <a href={telLink} className="flex flex-1 items-center justify-center gap-2 rounded-full bg-sindoor py-3.5 text-base font-bold text-ivory active:scale-95">
          <PhoneIcon className="size-5" /> <T hi="कॉल करें" en="Call" />
        </a>
        <a href={waLink()} target="_blank" rel="noopener" className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#1f8f4e] py-3.5 text-base font-bold text-white active:scale-95">
          <WhatsAppIcon className="size-5" /> WhatsApp
        </a>
        <LangToggle />
      </div>
    </div>
  );
}
