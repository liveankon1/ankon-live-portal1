export default function AboutPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <div className="relative overflow-hidden rounded-3xl border border-cyan-300/30 bg-slate-900/55 p-6 backdrop-blur-xl md:p-8">
        <div className="pointer-events-none absolute -left-20 top-0 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-60 w-60 rounded-full bg-fuchsia-500/20 blur-3xl" />

        <div className="relative z-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="rounded-2xl border border-slate-600/50 bg-slate-950/70 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/80">About Me</p>
            <h1 className="mt-2 text-4xl font-bold text-slate-50">HI Developers!!</h1>

            <pre className="mt-5 whitespace-pre-wrap rounded-xl border border-fuchsia-300/30 bg-slate-900/80 p-4 text-sm leading-7 text-slate-200">
{`❥ Welcome to my profile ᭄
╭────────────╯
↳ ❝ [ My Self Ankon ] ¡! ❞
╭─────────╯
❥ ೄChange the world by being yourself.࿐ ˊˎ-┊┊@liveankon`}
            </pre>

            <p className="mt-4 text-slate-300">
              Building cinematic interfaces, practical tools, and systems that feel futuristic while staying clean and fast.
            </p>
          </article>

          <article className="rounded-2xl border border-indigo-300/30 bg-slate-950/70 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-indigo-200/80">Social Command Deck</p>
            <div className="mt-4 grid gap-3">
              <a
                href="https://github.com/liveankon1"
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-slate-600/60 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 transition hover:-translate-y-0.5 hover:border-cyan-300/40 hover:text-cyan-100"
              >
                GitHub: github.com/liveankon1
              </a>
              <a
                href="https://ankon-live-portal1-6txz.vercel.app"
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-slate-600/60 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 transition hover:-translate-y-0.5 hover:border-cyan-300/40 hover:text-cyan-100"
              >
                Website: ankon-live-portal1-6txz.vercel.app
              </a>
              <a
                href="https://open.spotify.com/user/31zimyg3n64mmzkckvgtvkpizomu"
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-slate-600/60 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 transition hover:-translate-y-0.5 hover:border-emerald-300/40 hover:text-emerald-100"
              >
                Spotify: @31zimyg3n64mmzkckvgtvkpizomu
              </a>
              <a
                href="https://www.instagram.com/liveankon1/"
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-slate-600/60 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 transition hover:-translate-y-0.5 hover:border-fuchsia-300/40 hover:text-fuchsia-100"
              >
                Instagram: @liveankon1
              </a>
            </div>
          </article>
        </div>

        <article className="relative z-10 mt-6 rounded-2xl border border-indigo-300/35 bg-slate-950/75 p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-indigo-200/80">Discord Presence</p>
          <div className="mt-4 flex items-center gap-4">
            <div className="relative h-14 w-14 rounded-full bg-gradient-to-br from-indigo-400 via-violet-500 to-cyan-300 p-[2px]">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-950 text-lg font-bold text-indigo-100">
                D
              </div>
              <span className="absolute -right-0.5 -top-0.5 inline-flex h-3.5 w-3.5 animate-pulse rounded-full bg-emerald-400 ring-2 ring-slate-950" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Discord Username</p>
              <p className="text-xl font-semibold text-slate-100">@liveankon</p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
