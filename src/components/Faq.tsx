import { faq } from "@/content/faq";
import { T } from "@/i18n/T";

export function Faq() {
  return (
    <section className="px-4 py-20 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="eyebrow mb-4 text-sindoor"><T hi="सवाल-जवाब" en="Good to know" /></p>
          <h2 className="font-display text-[11vw] leading-[0.98] tracking-tight md:text-[4.6rem]" data-split>
            <T hi="सफ़र से पहले जान लें" en="Before you ride" />
          </h2>
        </div>
        <div className="border-t border-ink/15">
          {faq.map((f) => (
            <details key={f.q.en} className="group border-b border-ink/15" data-reveal>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-xl font-semibold md:text-2xl [&::-webkit-details-marker]:hidden">
                <T b={f.q} />
                <span className="relative size-9 shrink-0 rounded-full border-2 border-ink/20 transition-colors group-open:border-sindoor group-open:bg-sindoor" aria-hidden="true">
                  <span className="absolute top-1/2 left-1/2 h-0.5 w-3.5 -translate-1/2 bg-current group-open:bg-ivory" />
                  <span className="absolute top-1/2 left-1/2 h-3.5 w-0.5 -translate-1/2 bg-current transition-transform duration-300 group-open:scale-y-0" />
                </span>
              </summary>
              <p className="max-w-2xl pb-7 text-lg text-ink/85"><T b={f.a} /></p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
