import Link from "next/link";
import Image from "next/image";

export default function DownloadsPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 md:px-6">
      <div className="relative overflow-hidden rounded-3xl border border-fuchsia-300/35 bg-slate-900/60 p-6 md:p-8">
        <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-cyan-400/25 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-fuchsia-500/25 blur-3xl" />

        <div className="relative z-10 grid gap-7 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <article>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/90">Download Tab</p>
            <h1 className="mt-2 text-4xl font-bold leading-tight text-slate-50 md:text-5xl">
              Ankon Premiume Optimizer C++
            </h1>
            <p className="mt-4 max-w-2xl text-slate-300">
              Brutal neon presentation. Professional release block with instant package download for your optimizer.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="/Ankon-Premiume-Optimizer-Cpp.rar"
                download
                className="rounded-xl border border-emerald-300/45 bg-emerald-400/20 px-6 py-3 text-sm font-semibold text-emerald-100 transition hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(16,185,129,0.45)]"
              >
                Download Optimizer
              </a>
              <a
                href="/Venson-Client-Silent.exe"
                download
                className="rounded-xl border border-cyan-300/45 bg-cyan-400/20 px-6 py-3 text-sm font-semibold text-cyan-100 transition hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(34,211,238,0.45)]"
              >
                Download Venson Client [Silent]
              </a>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-600/45 bg-slate-950/70 p-4">
              <p className="text-sm text-slate-300">
                Package: <span className="text-fuchsia-200">Ankon Premiume Optimizer C++.rar</span>
              </p>
              <p className="mt-1 text-sm text-slate-300">
                Package: <span className="text-cyan-200">Venson Client [Silent].exe</span>
              </p>
              <p className="mt-1 text-xs text-slate-400">Format: RAR/EXE | Optimized release | Cinematic UI build</p>
            </div>
          </article>

          <article className="rounded-2xl border border-fuchsia-200/30 bg-slate-950/65 p-2">
            <div className="relative h-[300px] rounded-xl bg-gradient-to-br from-slate-900 via-indigo-950/70 to-fuchsia-950/40 md:h-[460px]">
              <Image
                src="/ankon-premium-optimizer-showcase.png"
                alt="Ankon Premiume Optimizer preview"
                fill
                priority
                className="rounded-xl object-contain p-2"
              />
            </div>
          </article>
        </div>
      </div>

      <div className="mt-6">
        <Link
          href="/tools"
          className="inline-flex rounded-xl border border-slate-500/50 bg-slate-900/45 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-cyan-300/40 hover:text-cyan-100"
        >
          Back to Tools
        </Link>
      </div>
    </section>
  );
}

