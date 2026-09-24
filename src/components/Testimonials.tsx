import { testimonials } from "@/content/testimonials";

function Card({ name, quote }: { name: string; quote: string }) {
  const initials = name.replace(/^Md\.\s*/, "M ").split(" ").map((w) => w[0]).join("").slice(0, 2);
  return (
    <figure className="w-[20rem] shrink-0 rounded-[1.5rem] border border-ink/10 bg-ivory p-7 md:w-[26rem]">
      <blockquote className="font-display text-xl leading-snug md:text-2xl">“{quote}”</blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-full bg-ink text-xs font-semibold tracking-wider text-ivory">{initials}</span>
        <span className="eyebrow text-ink/70">{name}</span>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  const half = Math.ceil(testimonials.length / 2);
  const rows = [testimonials.slice(0, half), testimonials.slice(half)];
  return (
    <section className="overflow-hidden bg-ivory-2 py-24 md:py-36">
      <div className="mx-auto mb-14 max-w-[1400px] px-4 md:px-8">
        <p className="eyebrow mb-5 text-sindoor">Travellers · <span className="hindi text-[0.95rem]">यात्री</span></p>
        <h2 className="font-display text-[12vw] leading-[0.92] font-light tracking-tight md:text-[5.5rem]" data-split>
          1000+ journeys, <em>in their words</em>
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
