import { site } from "@/content/site";
import { MadhubaniBorder } from "./Madhubani";

export function Stats() {
  return (
    <section className="bg-sindoor px-4 text-ivory md:px-8">
      <MadhubaniBorder className="text-ivory/40" />
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-y-12 py-20 md:grid-cols-4 md:py-28">
        {site.stats.map((s) => (
          <div key={s.label} className="border-l border-ivory/25 pl-5 md:pl-8" data-reveal>
            <p className="font-display text-6xl font-light tabular-nums md:text-8xl">
              <span data-count={s.value}>{s.value.toLocaleString("en-IN")}</span>
              <span className="text-turmeric">{s.suffix}</span>
            </p>
            <p className="eyebrow mt-3 text-ivory/75">{s.label}</p>
          </div>
        ))}
      </div>
      <MadhubaniBorder className="text-ivory/40" />
    </section>
  );
}
