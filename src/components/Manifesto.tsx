import Link from "next/link";
import { FishPair } from "./Madhubani";

export function Manifesto() {
  return (
    <section id="manifesto" className="relative px-4 py-28 md:px-8 md:py-44">
      <div className="mx-auto max-w-6xl text-center">
        <FishPair className="mx-auto mb-10 size-20 text-terracotta" />
        <p className="eyebrow mb-10 text-ink/50">Our journey, our responsibility</p>
        <p data-scrub-words className="font-display text-[8.2vw] leading-[1.08] font-light tracking-tight md:text-[3.6rem] lg:text-[4.2rem]">
          We are a Patna travel desk that <em>knows the road</em> — from the Gandhi Setu at dawn to the ghats of Gaya at dusk.
          Clean cars, fair fixed fares and drivers who get your family there <em>safely</em>. Not an app, not a call centre —
          just <em className="text-sindoor">Bihar, driving you home.</em>
        </p>
        <div className="mt-14" data-reveal>
          <Link href="/about/" className="eyebrow inline-block rounded-full bg-ink px-8 py-4 text-ivory transition-colors hover:bg-sindoor">
            Our story
          </Link>
        </div>
      </div>
    </section>
  );
}
