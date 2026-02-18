import Link from "next/link";

export default function OptimizerToolPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <div className="relative overflow-hidden rounded-3xl border border-fuchsia-300/35 bg-slate-900/55 p-6 md:p-8">
        <div className="pointer-events-none absolute -left-24 top-0 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-fuchsia-500/20 blur-3xl" />

        <div className="relative z-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/90">Ankon Systems Drop</p>
          <h1 className="mt-2 text-4xl font-bold text-slate-50 md:text-5xl">Ankon Premiume Optimizer C++</h1>
          <p className="mt-3 max-w-3xl text-slate-300">
            Cinematic C++ optimizer release with a premium control-panel style and direct local package download.
          </p>
        </div>

        <div className="relative z-10 mt-7 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-2xl border border-slate-600/50 bg-slate-950/65 p-5">
            <h2 className="text-xl font-semibold text-slate-100">Download Package</h2>
            <p className="mt-2 text-sm text-slate-300">
              File: <span className="font-medium text-cyan-200">Ankon Premiume Optimizer C++.rar</span>
            </p>
            <p className="mt-1 text-sm text-slate-400">Ready for direct download from this page.</p>

            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="/Ankon-Premiume-Optimizer-Cpp.rar"
                className="rounded-xl border border-emerald-300/40 bg-emerald-400/20 px-5 py-2.5 text-sm font-semibold text-emerald-100 transition hover:-translate-y-0.5 hover:shadow-[0_0_28px_rgba(16,185,129,0.35)]"
              >
                Download Now
              </a>
              <Link
                href="/tools"
                className="rounded-xl border border-cyan-300/40 bg-cyan-300/15 px-5 py-2.5 text-sm font-semibold text-cyan-100 transition hover:-translate-y-0.5"
              >
                Back to Tools
              </Link>
            </div>
          </article>

          <article className="rounded-2xl border border-fuchsia-200/30 bg-slate-950/60 p-2">
            <div
              className="h-[260px] rounded-xl bg-cover bg-center md:h-[340px]"
              style={{ backgroundImage: "url('/ankon-premium-optimizer-showcase.png')" }}
              aria-label="Ankon Premiume Optimizer preview image"
            />
          </article>
        </div>
      </div>
    </section>
  );
}
