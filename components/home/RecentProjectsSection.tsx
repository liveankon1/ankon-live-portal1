import Image from "next/image";

export const RecentProjectsSection = () => {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:px-6" id="recent-projects">
      <div className="mb-6">
        <p className="text-sm uppercase tracking-[0.2em] text-fuchsia-200/85">Featured</p>
        <h2 className="mt-2 text-3xl font-semibold text-slate-50">Ankon Premiume Optimizer C++</h2>
      </div>

      <article className="relative overflow-hidden rounded-3xl border border-fuchsia-300/35 bg-slate-900/65 p-5 md:p-7">
        <div className="pointer-events-none absolute -left-20 top-0 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="pointer-events-none absolute right-4 top-8 h-4 w-4 rounded-full bg-cyan-300/70 shadow-[0_0_22px_rgba(34,211,238,0.75)]" />
        <div className="pointer-events-none absolute right-20 top-28 h-2.5 w-2.5 rounded-full bg-fuchsia-400/80 shadow-[0_0_16px_rgba(217,70,239,0.8)]" />
        <div className="pointer-events-none absolute left-1/3 top-16 h-3 w-3 rounded-full bg-violet-300/80 shadow-[0_0_18px_rgba(196,181,253,0.85)]" />
        <div className="pointer-events-none absolute -right-28 bottom-0 h-64 w-64 rounded-full bg-fuchsia-500/20 blur-3xl" />

        <div className="relative z-10 grid gap-6 lg:grid-cols-[1.03fr_0.97fr] lg:items-center">
          <div>
            <div className="inline-flex items-center rounded-full border border-emerald-300/35 bg-emerald-300/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-emerald-100">
              Live Release
            </div>
            <h3 className="mt-3 text-3xl font-bold leading-tight text-slate-50 md:text-4xl">
              C++ Performance Suite with Brutal Neon Interface
            </h3>
            <p className="mt-4 max-w-2xl text-slate-300">
              Dedicated premium software spotlight with cinematic visuals, direct package download, and a custom glow profile to make this drop stand out.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/downloads"
                className="rounded-xl border border-cyan-300/45 bg-cyan-300/18 px-5 py-2.5 text-sm font-semibold text-cyan-100 transition hover:-translate-y-0.5 hover:shadow-[0_0_25px_rgba(34,211,238,0.45)]"
              >
                Open Download Tab
              </a>
              <a
                href="/Ankon-Premiume-Optimizer-Cpp.rar"
                download
                className="rounded-xl border border-fuchsia-300/45 bg-fuchsia-400/15 px-5 py-2.5 text-sm font-semibold text-fuchsia-100 transition hover:-translate-y-0.5 hover:shadow-[0_0_25px_rgba(217,70,239,0.42)]"
              >
                Download C++ Package
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-fuchsia-200/30 bg-slate-950/65 p-2">
            <div className="relative h-[260px] rounded-xl bg-gradient-to-br from-slate-900 via-indigo-950/70 to-fuchsia-950/45 md:h-[360px]">
              <Image
                src="/ankon-premium-optimizer-showcase.png"
                alt="Ankon Premiume Optimizer C++ visual"
                fill
                priority
                className="rounded-xl object-contain p-2"
              />
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};
