// Original line-art motifs in the spirit of Mithila (Madhubani) painting:
// double-line borders filled with "kachni" hatching, the paired fish of good
// fortune, the sun and the lotus. Drawn with currentColor so they theme freely.

type P = { className?: string };

export function MadhubaniBorder({ className = "" }: P) {
  return (
    <svg className={className} width="100%" height="28" aria-hidden="true">
      <defs>
        <pattern id="mb-border" width="36" height="28" patternUnits="userSpaceOnUse">
          <path d="M0 4H36M0 24H36" stroke="currentColor" strokeWidth="1.2" />
          <path d="M0 24L9 8L18 24L27 8L36 24" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M4.5 22L9 14M13.5 22L9 14M22.5 22L27 14M31.5 22L27 14" stroke="currentColor" strokeWidth="0.6" />
          <circle cx="18" cy="9" r="1.6" fill="currentColor" />
          <circle cx="0" cy="9" r="1.6" fill="currentColor" />
          <circle cx="36" cy="9" r="1.6" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="28" fill="url(#mb-border)" />
    </svg>
  );
}

function Fish({ flip = false }: { flip?: boolean }) {
  return (
    <g transform={flip ? "translate(120 120) rotate(180)" : undefined}>
      <path d="M22 44C38 22 72 20 92 38C72 56 38 60 22 44Z" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M92 38L108 26L104 40L110 52Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="36" cy="40" r="4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="36" cy="40" r="1.4" fill="currentColor" />
      <path d="M50 30C54 38 54 46 50 52M60 28C64 38 64 46 60 54M70 30C74 38 74 46 70 52M80 33C83 38 83 44 80 48" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M52 30L56 22L62 29M66 29L72 22L76 31" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </g>
  );
}

export function FishPair({ className = "" }: P) {
  return (
    <svg className={className} viewBox="0 0 120 120" aria-hidden="true">
      <circle cx="60" cy="60" r="57" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" />
      <Fish />
      <Fish flip />
    </svg>
  );
}

export function Sun({ className = "", draw = false }: P & { draw?: boolean }) {
  const rays = Array.from({ length: 16 }, (_, i) => i * 22.5);
  const d = draw ? { "data-draw": "" } : {};
  return (
    <svg className={className} viewBox="0 0 120 120" aria-hidden="true">
      <circle cx="60" cy="60" r="22" fill="none" stroke="currentColor" strokeWidth="1.6" {...d} />
      <circle cx="60" cy="60" r="15" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="1.5 3" />
      <circle cx="60" cy="60" r="5" fill="currentColor" />
      {rays.map((a, i) => (
        <path
          key={a}
          d={i % 2 ? "M60 30L60 18" : "M55 32L60 10L65 32"}
          transform={`rotate(${a} 60 60)`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
          {...d}
        />
      ))}
    </svg>
  );
}

export function Lotus({ className = "" }: P) {
  return (
    <svg className={className} viewBox="0 0 120 80" aria-hidden="true">
      <path d="M60 70C48 56 48 30 60 12C72 30 72 56 60 70Z" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M60 70C44 64 30 48 28 28C44 34 56 50 60 70Z" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M60 70C76 64 90 48 92 28C76 34 64 50 60 70Z" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M60 70C40 72 18 64 8 48C28 46 48 56 60 70Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M60 70C80 72 102 64 112 48C92 46 72 56 60 70Z" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M60 24V62M54 34L60 40L66 34M54 46L60 52L66 46" fill="none" stroke="currentColor" strokeWidth="0.8" />
      <path d="M20 76H100" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
