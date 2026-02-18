import Image from "next/image";

const links = [
  { label: "GitHub", href: "https://github.com/liveankon1" },
  { label: "Website", href: "https://ankon-live-portal1-6txz.vercel.app" },
  { label: "Spotify", href: "https://open.spotify.com/user/31zimyg3n64mmzkckvgtvkpizomu" },
  { label: "Instagram", href: "https://www.instagram.com/liveankon1/" }
];

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <div className="relative overflow-hidden rounded-3xl border border-cyan-300/30 bg-slate-900/55 p-6 backdrop-blur-xl md:p-8">
        <div className="pointer-events-none absolute -left-20 top-0 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="pointer-events-none absolute right-10 top-12 h-16 w-16 rounded-2xl border border-indigo-300/25 bg-indigo-400/20" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-fuchsia-500/20 blur-3xl" />

        <div className="relative z-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="rounded-2xl border border-slate-600/50 bg-slate-950/80 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-200/80">About Me</p>
            <h1 className="mt-2 text-4xl font-bold text-slate-50">HI Developers!!</h1>

            <pre className="mt-5 whitespace-pre-wrap rounded-xl border border-fuchsia-300/30 bg-slate-900/80 p-4 text-sm leading-7 text-slate-200">
{`❥ Welcome to my profile ᭄
╭────────────╯
↳ ❝ [ My Self Ankon ] ¡! ❞
╭─────────╯
❥ ೄChange the world by being yourself.࿐ ˊˎ-┊┊@liveankon`}
            </pre>

            <div className="mt-5 rounded-xl border border-indigo-300/35 bg-slate-900/75 p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-indigo-200/80">Discord</p>
              <div className="mt-2 flex items-center gap-3">
                <div className="relative h-11 w-11 rounded-full bg-gradient-to-br from-indigo-400 via-violet-500 to-cyan-300 p-[2px]">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-950 text-sm font-bold text-indigo-100">D</div>
                  <span className="absolute -right-0.5 -top-0.5 inline-flex h-3 w-3 animate-pulse rounded-full bg-emerald-400 ring-2 ring-slate-950" />
                </div>
                <p className="text-xl font-semibold text-slate-100">@liveankon</p>
              </div>
            </div>
          </aside>

          <div className="space-y-5">
            <article className="rounded-2xl border border-slate-600/50 bg-slate-950/78 p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">Social Media Visual</p>
              <div className="mt-3 overflow-hidden rounded-xl border border-slate-700/60 bg-slate-900/70">
                <Image
                  src="/about-social-media.png"
                  alt="Social media style visual"
                  width={1624}
                  height={1074}
                  className="h-auto w-full object-cover"
                  priority
                />
              </div>
            </article>

            <article className="rounded-2xl border border-cyan-300/25 bg-slate-950/78 p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-cyan-200/80">Connect</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-slate-600/70 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 transition hover:-translate-y-0.5 hover:border-cyan-300/45 hover:text-cyan-100"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
