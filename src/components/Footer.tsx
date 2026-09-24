import Link from "next/link";
import { nav, site } from "@/content/site";
import { routes, routeTitleBi } from "@/content/routes";
import { T } from "@/i18n/T";
import { telLink, waLink } from "@/lib/whatsapp";
import { MadhubaniBorder, Sun } from "./Madhubani";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink pb-20 text-ivory md:pb-0">
      <MadhubaniBorder className="text-turmeric/50" />
      <div className="mx-auto max-w-[1600px] px-4 pt-20 md:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Sun className="mb-6 size-14 text-turmeric" />
            <p className="hindi text-3xl text-turmeric">{site.taglineHi}</p>
            <p className="mt-3 max-w-xs text-ivory/80"><T b={site.tagline} />. <T hi="पटना से लोकल, बाहर, परिवार, ग्रुप और तीर्थ यात्रा।" en="Local, outstation, family, group and pilgrimage travel from Patna." /></p>
            <a href={waLink()} target="_blank" rel="noopener" className="eyebrow mt-8 inline-block rounded-full bg-sindoor px-7 py-4 transition-colors hover:bg-ivory hover:text-ink">
              <T hi="WhatsApp पर बुक करें" en="Book on WhatsApp" />
            </a>
          </div>
          <div>
            <p className="eyebrow mb-5 text-ivory/55"><T hi="पता" en="Visit" /></p>
            <address className="not-italic text-ivory/80">
              <T b={site.address.line1} />
              <br />
              <T b={site.address.city} />, <T b={site.address.state} /> {site.address.pin}
            </address>
            <p className="eyebrow mt-8 mb-3 text-ivory/55"><T hi="बात करें" en="Talk" /></p>
            <a href={telLink} className="block text-ivory/80 hover:text-turmeric">{site.phone}</a>
            <a href={`mailto:${site.email}`} className="block break-all text-ivory/80 hover:text-turmeric">{site.email}</a>
            <a href={site.socials.facebook} target="_blank" rel="noopener" className="mt-3 block text-ivory/80 hover:text-turmeric">Facebook ↗</a>
          </div>
          <div>
            <p className="eyebrow mb-5 text-ivory/55"><T hi="पेज" en="Explore" /></p>
            <ul className="space-y-2">
              {nav.map((n) => (
                <li key={n.href}><Link href={n.href} className="text-ivory/80 hover:text-turmeric"><T b={n.label} /></Link></li>
              ))}
              <li><Link href="/credits/" className="text-ivory/80 hover:text-turmeric"><T hi="फ़ोटो क्रेडिट" en="Photo credits" /></Link></li>
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-5 text-ivory/55"><T hi="लोकप्रिय रूट" en="Popular routes" /></p>
            <ul className="space-y-2">
              {routes.slice(0, 6).map((r) => (
                <li key={r.slug}><Link href={`/routes/${r.slug}/`} className="text-ivory/80 hover:text-turmeric"><T b={routeTitleBi(r)} /></Link></li>
              ))}
            </ul>
          </div>
        </div>

        <p aria-hidden="true" className="mt-20 flex justify-between font-sans text-[10.8vw] leading-[0.8] font-extrabold tracking-[-0.055em] text-ivory/[0.07] select-none">
          {"SHRI SHYAM BABA".split(" ").map((w) => <span key={w}>{w}</span>)}
        </p>
        <div className="flex flex-col gap-2 border-t border-ivory/10 py-6 text-xs text-ivory/45 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p><T hi="बिहार में बना, बिहार की सड़कों के लिए।" en="Made in Bihar, with love for its roads." /></p>
        </div>
      </div>
    </footer>
  );
}
