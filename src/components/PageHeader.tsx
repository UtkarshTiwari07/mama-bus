export function PageHeader({ eyebrow, title, hi, children }: { eyebrow: string; title: React.ReactNode; hi?: string; children?: React.ReactNode }) {
  return (
    <header className="px-4 pt-36 pb-16 md:px-8 md:pt-48 md:pb-24">
      <div className="mx-auto max-w-[1400px]">
        <p className="eyebrow mb-6 text-sindoor">{eyebrow}</p>
        {hi && <p className="hindi mb-3 text-3xl text-terracotta md:text-4xl" data-reveal>{hi}</p>}
        <h1 className="font-display text-[13vw] leading-[0.9] font-light tracking-tight md:text-[7.5rem]" data-split>{title}</h1>
        {children && <div className="mt-8 max-w-2xl text-lg text-ink/70" data-reveal>{children}</div>}
      </div>
    </header>
  );
}
