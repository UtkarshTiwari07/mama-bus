import { faq } from "@/content/faq";

export function Faq() {
  return (
    <section className="px-4 py-24 md:px-8 md:py-36">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="eyebrow mb-5 text-sindoor">Good to know · <span className="hindi text-[0.95rem]">सवाल-जवाब</span></p>
          <h2 className="font-display text-[12vw] leading-[0.92] font-light tracking-tight md:text-[5rem]" data-split>
            Before you <em>ride</em>
          </h2>
        </div>
        <div className="border-t border-ink/15">
          {faq.map((f) => (
            <details key={f.q} className="group border-b border-ink/15" data-reveal>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-display text-xl md:text-2xl [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="relative size-8 shrink-0 rounded-full border border-ink/20 transition-colors group-open:border-sindoor group-open:bg-sindoor" aria-hidden="true">
                  <span className="absolute top-1/2 left-1/2 h-px w-3 -translate-1/2 bg-current group-open:bg-ivory" />
                  <span className="absolute top-1/2 left-1/2 h-3 w-px -translate-1/2 bg-current transition-transform duration-300 group-open:scale-y-0" />
                </span>
              </summary>
              <p className="max-w-2xl pb-7 text-ink/70">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
