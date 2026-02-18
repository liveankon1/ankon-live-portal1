import Link from "next/link";

export const OptimizerFeatureSection = () => {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-8 pt-4 md:px-6">
      <div className="relative overflow-hidden rounded-3xl border border-fuchsia-300/35 bg-slate-900/55 p-5 md:p-7">
        <div className="pointer-events-none absolute -left-24 top-0 h-52 w-52 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-56 w-56 rounded-full bg-fuchsia-500/20 blur-3xl" />

        <div className="relative z-10 grid gap-6 md:grid-cols-[1.05fr_0.95fr] md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-fuchsia-200/90">Featured Download</p>
            <h2 className="mt-2 text-3xl font-bold leading-tight text-slate-50 md:text-4xl">
              Ankon Premiume Optimizer C++
            </h2>
            <p className="mt-3 max-w-2xl text-slate-300">
              Brutal-cool optimization suite with a cinematic panel design. Download the package or open the dedicated launch page.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/Ankon-Premiume-Optimizer-Cpp.rar"
                className="rounded-xl border border-emerald-300/40 bg-emerald-400/20 px-5 py-2.5 text-sm font-semibold text-emerald-100 transition hover:-translate-y-0.5 hover:shadow-[0_0_28px_rgba(16,185,129,0.35)]"
              >
                Download Optimizer
              </a>
              <Link
                href="/tools/optimizer"
                className="rounded-xl border border-cyan-300/40 bg-cyan-300/15 px-5 py-2.5 text-sm font-semibold text-cyan-100 transition hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(34,211,238,0.35)]"
              >
                Open Launch Page
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-fuchsia-200/25 bg-slate-950/60 p-2">
            <div
              className="h-[220px] rounded-xl bg-cover bg-center md:h-[280px]"
              style={{ backgroundImage: "url('/ankon-premium-optimizer-showcase.png')" }}
              aria-label="Ankon Premiume Optimizer showcase artwork"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
