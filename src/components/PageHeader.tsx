import { Slideshow } from "./Slideshow";

/** Inner-page header: a short changing-photo strip with the title on top. */
export function PageHeader({ eyebrow, title, children }: { eyebrow: React.ReactNode; title: React.ReactNode; children?: React.ReactNode }) {
  return (
    <header className="relative overflow-hidden bg-ink px-4 pt-32 pb-14 text-ivory md:px-8 md:pt-44 md:pb-20">
      <Slideshow showCaption={false} interval={6000} />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/70 to-ink/40" />
      <div className="relative mx-auto max-w-[1400px]">
        <p className="eyebrow mb-5 text-turmeric">{eyebrow}</p>
        <h1 className="font-display text-[12vw] leading-[0.95] tracking-tight md:text-[6.5rem]" data-split>{title}</h1>
        {children && <div className="mt-6 max-w-2xl text-lg text-ivory/90 md:text-xl" data-reveal>{children}</div>}
      </div>
    </header>
  );
}
