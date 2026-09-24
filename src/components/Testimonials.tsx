import { testimonials } from "@/content/testimonials";
import { T } from "@/i18n/T";

function Card({ name, quote }: (typeof testimonials)[number]) {
  const initials = name.replace(/^Md\.\s*/, "M ").split(" ").map((w) => w[0]).join("").slice(0, 2);
  return (
    <figure className="w-[19rem] shrink-0 rounded-[1.5rem] border border-ink/10 bg-ivory p-6 md:w-[25rem] md:p-7">
      <blockquote className="font-display text-xl leading-snug md:text-2xl">“<T b={quote} />”</blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-full bg-ink text-xs font-semibold tracking-wider text-ivory">{initials}</span>
        <span className="font-semibold text-ink/80">{name}</span>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  const half = Math.ceil(testimonials.length / 2);
  const rows = [testimonials.slice(0, half), testimonials.slice(half)];
  return (
    <section className="overflow-hidden bg-ivory-2 py-20 md:py-32">
      <div className="mx-auto mb-12 max-w-[1400px] px-4 md:px-8">
        <p className="eyebrow mb-4 text-sindoor"><T hi="यात्रियों की बात" en="Travellers" /></p>
        <h2 className="font-display text-[11vw] leading-[0.98] tracking-tight md:text-[5rem]" data-split>
          <T hi="1000+ सफ़र, उन्हीं की ज़ुबानी" en="1000+ journeys, in their words" />
        </h2>
      </div>
      <div className="marquee-wrap space-y-5">
        {rows.map((row, r) => (
          <div key={r} className={`marquee gap-5 pr-5 ${r ? "reverse" : ""}`} style={{ ["--marquee-duration" as string]: "55s" }}>
            {[...row, ...row].map((t, i) => (
              <div key={i} aria-hidden={i >= row.length}>
                <Card {...t} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
