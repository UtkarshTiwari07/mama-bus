import map from "@/content/bihar-map.json";
import { cities, type CityKey } from "@/content/routes";

// Route mini-map: the district outline is one shared, cached SVG file; only the
// route line, the two cities and the little car are drawn per page.
export function RouteMap({ from, to }: { from: CityKey; to: CityKey }) {
  const a = cities[from];
  const b = cities[to];
  const mx = (a.x + b.x) / 2 - (b.y - a.y) * 0.25;
  const my = (a.y + b.y) / 2 + (b.x - a.x) * 0.25;
  const d = `M${a.x},${a.y} Q${mx},${my} ${b.x},${b.y}`;
  return (
    <div className="relative">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/bihar-outline.svg" alt="" width={map.width} height={map.height} className="h-auto w-full" />
      <svg viewBox={`0 0 ${map.width} ${map.height}`} className="absolute inset-0 h-full w-full" role="img" aria-label={`${a.hi} से ${b.hi} / ${a.name} to ${b.name}`}>
        <path d={d} fill="none" stroke="#b3362b" strokeWidth="3.5" strokeLinecap="round" data-draw="" />
        {[a, b].map((c, i) => (
          <g key={c.name}>
            <circle cx={c.x} cy={c.y} r="16" className={`${i ? "fill-turmeric/30" : "fill-sindoor/25"} animate-pulse`} />
            <circle cx={c.x} cy={c.y} r="7" className={i ? "fill-turmeric" : "fill-sindoor"} />
            <text x={c.x + 18} y={c.y + 6} className="fill-ink text-[20px] font-bold">{c.hi}</text>
            <text x={c.x + 18} y={c.y + 26} className="fill-ink/60 text-[14px] tracking-[0.1em] uppercase">{c.name}</text>
          </g>
        ))}
        <g>
          <circle r="13" fill="#16302a" />
          <text textAnchor="middle" dy="6" fontSize="16">🚕</text>
          <animateMotion dur="4s" begin="1.6s" repeatCount="indefinite" path={d} />
        </g>
      </svg>
    </div>
  );
}
