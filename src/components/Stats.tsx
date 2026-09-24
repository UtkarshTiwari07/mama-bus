import { site } from "@/content/site";
import { T } from "@/i18n/T";
import { MadhubaniBorder } from "./Madhubani";

export function Stats() {
  return (
    <section className="bg-sindoor px-4 text-ivory md:px-8">
      <MadhubaniBorder className="text-ivory/40" />
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-y-10 py-16 md:grid-cols-4 md:py-24">
        {site.stats.map((s) => (
          <div key={s.label.en} className="border-l-2 border-ivory/30 pl-5 md:pl-8" data-reveal>
            <p className="font-display text-6xl tabular-nums md:text-8xl">
              <span data-count={s.value}>{s.value.toLocaleString("en-IN")}</span>
              <span className="text-turmeric">{s.suffix}</span>
            </p>
            <p className="mt-2 text-lg font-semibold text-ivory/90"><T b={s.label} /></p>
          </div>
        ))}
      </div>
      <MadhubaniBorder className="text-ivory/40" />
    </section>
  );
}
