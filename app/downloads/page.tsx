import Link from "next/link";
import Image from "next/image";

export default function DownloadsPage() {
  return (
    <section className="relative isolate overflow-hidden py-14">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_16%,rgba(34,211,238,0.2),transparent_28%),radial-gradient(circle_at_85%_10%,rgba(236,72,153,0.24),transparent_34%),radial-gradient(circle_at_50%_90%,rgba(79,70,229,0.2),transparent_36%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(56,189,248,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.06)_1px,transparent_1px)] bg-[size:56px_56px]" />

      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="relative overflow-hidden rounded-[2rem] border border-fuchsia-300/30 bg-slate-950/55 p-6 shadow-[0_0_70px_rgba(59,130,246,0.15)] backdrop-blur-xl md:p-8">
          <div className="pointer-events-none absolute -left-16 top-8 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-16 bottom-4 h-60 w-60 rounded-full bg-fuchsia-500/20 blur-3xl" />

          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <article>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200/95">Download Tab</p>
              <h1 className="mt-3 text-4xl font-black leading-[0.98] text-transparent md:text-6xl bg-gradient-to-r from-cyan-300 via-blue-200 to-fuchsia-300 bg-clip-text">
                Ankon C++ Premium
              </h1>
              <p className="mt-4 max-w-xl text-lg text-slate-200/90">Performance Utility | Stable | Fast</p>

              <div className="mt-6 inline-flex rounded-2xl border border-amber-300/50 bg-amber-500/15 px-4 py-2 text-sm font-bold uppercase tracking-wide text-amber-100 shadow-[0_0_22px_rgba(251,191,36,0.35)]">
                Official Release
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="/Ankon-Premiume-Optimizer-Cpp.rar"
                  download
                  className="rounded-xl border border-emerald-300/45 bg-emerald-400/20 px-5 py-3 text-sm font-semibold text-emerald-100 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_28px_rgba(16,185,129,0.5)]"
                >
                  Download Optimizer
                </a>
                <a
                  href="/Venson-Client-Silent.exe"
                  download
                  className="rounded-xl border border-cyan-300/45 bg-cyan-400/20 px-5 py-3 text-sm font-semibold text-cyan-100 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_28px_rgba(34,211,238,0.5)]"
                >
                  Download Venson Client [Silent]
                </a>
                <a
                  href="/Ankons-Fair-World.rar"
                  download
                  className="rounded-xl border border-fuchsia-300/45 bg-fuchsia-500/20 px-5 py-3 text-sm font-semibold text-fuchsia-100 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_28px_rgba(217,70,239,0.5)]"
                >
                  Download Ankon&apos;s Fair World
                </a>
              </div>

              <div className="mt-6 rounded-2xl border border-slate-500/45 bg-slate-950/75 p-4">
                <p className="text-sm text-slate-300">
                  Package: <span className="text-fuchsia-200">Ankon Premiume Optimizer C++.rar</span>
                </p>
                <p className="mt-1 text-sm text-slate-300">
                  Package: <span className="text-cyan-200">Venson Client [Silent].exe</span>
                </p>
                <p className="mt-1 text-sm text-slate-300">
                  Package: <span className="text-emerald-200">Ankon&apos;s Fair World.rar</span>
                </p>
                <p className="mt-2 text-xs text-slate-400">Format: RAR/EXE | Optimized release | Cinematic UI build</p>
              </div>
            </article>

            <article className="rounded-3xl border border-fuchsia-200/30 bg-slate-950/60 p-2.5 shadow-[0_0_40px_rgba(147,51,234,0.2)]">
              <div className="relative h-[310px] rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950/70 to-fuchsia-950/45 md:h-[470px]">
                <Image
                  src="/ankon-premium-optimizer-showcase.png"
                  alt="Ankon Premiume Optimizer preview"
                  fill
                  priority
                  className="rounded-2xl object-contain p-2"
                />
              </div>
            </article>
          </div>
        </div>

        <div className="relative mt-6 overflow-hidden rounded-3xl border border-cyan-300/25 bg-slate-950/45 p-5 shadow-[0_0_28px_rgba(34,211,238,0.15)] backdrop-blur-xl md:p-6">
          <div className="pointer-events-none absolute -left-8 -top-8 h-36 w-36 rounded-full bg-cyan-400/15 blur-3xl" />
          <div className="pointer-events-none absolute -right-6 -bottom-10 h-40 w-40 rounded-full bg-fuchsia-500/15 blur-3xl" />

          <div className="relative z-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <article>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/90">Extra Drop</p>
              <h2 className="mt-2 text-3xl font-black text-transparent bg-gradient-to-r from-cyan-300 to-fuchsia-300 bg-clip-text md:text-4xl">
                Ankon&apos;s Fair World
              </h2>
              <p className="mt-3 max-w-xl text-slate-300">
                Added with the same premium visual style so it feels like another official release card.
              </p>

              <div className="mt-5 inline-flex rounded-2xl border border-amber-300/45 bg-amber-500/15 px-4 py-2 text-sm font-bold uppercase tracking-wide text-amber-100 shadow-[0_0_18px_rgba(251,191,36,0.3)]">
                Official Release
              </div>

              <div className="mt-6">
                <a
                  href="/Ankons-Fair-World.rar"
                  download
                  className="inline-flex rounded-xl border border-fuchsia-300/45 bg-fuchsia-500/20 px-5 py-3 text-sm font-semibold text-fuchsia-100 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_28px_rgba(217,70,239,0.5)]"
                >
                  Download Ankon&apos;s Fair World
                </a>
              </div>
            </article>

            <article className="rounded-3xl border border-fuchsia-200/30 bg-slate-950/60 p-2.5 shadow-[0_0_36px_rgba(147,51,234,0.2)]">
              <div className="relative h-[250px] rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950/70 to-fuchsia-950/45 md:h-[320px]">
                <Image
                  src="/ankons-fair-world-cover.png"
                  alt="Ankon's Fair World preview"
                  fill
                  className="rounded-2xl object-cover p-1.5"
                />
              </div>
            </article>
          </div>
        </div>

        <div className="mt-6">
          <Link
            href="/tools"
            className="inline-flex rounded-xl border border-slate-500/55 bg-slate-900/55 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-cyan-300/45 hover:text-cyan-100"
          >
            Back to Tools
          </Link>
        </div>
      </div>
    </section>
  );
}

