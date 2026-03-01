import Link from "next/link";

type StreamInfo = {
  title: string;
  description: string;
  status: "Live" | "Offline";
  watchHref: string;
  subscribeHref: string;
  chatHref: string;
  embedUrl: string;
};

const stream: StreamInfo = {
  title: "Ankon Live Coding Session",
  description: "Real-time coding, release previews, Q&A, and live community builds on YouTube.",
  status: "Live",
  watchHref: "https://www.youtube.com/@liveankon1/live",
  subscribeHref: "https://www.youtube.com/@liveankon1?sub_confirmation=1",
  chatHref: "https://www.youtube.com/@liveankon1/live",
  embedUrl: "https://www.youtube.com/embed/jfKfPfyJRdk"
};

const streamPanels = [
  {
    label: "Stream Quality",
    value: "1080p / 60fps",
    detail: "Optimized for desktop and mobile playback"
  },
  {
    label: "Upload Frequency",
    value: "3-5 videos weekly",
    detail: "Live sessions + highlight uploads"
  },
  {
    label: "Main Focus",
    value: "YouTube-first content",
    detail: "Coding, tool demos, and performance tips"
  }
] as const;

const upcoming = [
  { day: "Monday", topic: "Website UI rebuild", time: "9:00 PM" },
  { day: "Wednesday", topic: "Toolbox feature drop", time: "10:00 PM" },
  { day: "Friday", topic: "Live bug fixing + Q&A", time: "9:30 PM" }
] as const;

const videos = [
  { title: "Optimizer Showcase", href: "https://www.youtube.com/@liveankon1/videos", tag: "Performance" },
  { title: "Portal Update Walkthrough", href: "https://www.youtube.com/@liveankon1/videos", tag: "Development" },
  { title: "Community Requested Build", href: "https://www.youtube.com/@liveankon1/videos", tag: "Live Replay" }
] as const;

export default function LivePage() {
  const isLive = stream.status === "Live";

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:px-6">
      <div className="relative overflow-hidden rounded-3xl border border-red-300/30 bg-slate-900/55 p-6 backdrop-blur-xl md:p-8">
        <div className="pointer-events-none absolute -left-20 top-0 h-56 w-56 rounded-full bg-red-500/20 blur-3xl" />
        <div className="pointer-events-none absolute right-8 top-6 h-14 w-14 rounded-2xl border border-cyan-300/30 bg-cyan-400/15" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="relative z-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <article>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/40 bg-emerald-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-emerald-100">
              {isLive ? <span className="live-dot" aria-hidden="true" /> : null}
              <span>{isLive ? "Live on YouTube" : "YouTube Standby"}</span>
            </div>

            <h1 className="mt-4 text-4xl font-bold text-slate-50 md:text-5xl">{stream.title}</h1>
            <p className="mt-4 max-w-3xl text-slate-300">{stream.description}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={stream.watchHref}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-red-300/50 bg-red-400/20 px-5 py-2.5 text-sm font-semibold text-red-100 transition hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(248,113,113,0.35)]"
              >
                Watch Live
              </a>
              <a
                href={stream.subscribeHref}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-cyan-300/45 bg-cyan-400/20 px-5 py-2.5 text-sm font-semibold text-cyan-100 transition hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(34,211,238,0.35)]"
              >
                Subscribe Channel
              </a>
              <a
                href={stream.chatHref}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-slate-400/45 bg-slate-800/65 px-5 py-2.5 text-sm font-semibold text-slate-100 transition hover:border-cyan-300/45 hover:text-cyan-100"
              >
                Open Live Chat
              </a>
            </div>
          </article>

          <aside className="space-y-3 rounded-2xl border border-slate-600/50 bg-slate-950/75 p-4">
            <p className="text-xs uppercase tracking-[0.14em] text-cyan-200/80">Stream Console</p>
            {streamPanels.map((panel) => (
              <div key={panel.label} className="rounded-xl border border-slate-700/70 bg-slate-900/80 p-3">
                <p className="text-xs uppercase tracking-[0.12em] text-slate-400">{panel.label}</p>
                <p className="mt-1 text-lg font-semibold text-slate-100">{panel.value}</p>
                <p className="text-xs text-slate-400">{panel.detail}</p>
              </div>
            ))}
          </aside>
        </div>
      </div>

      <div className="mt-7 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        <article className="overflow-hidden rounded-2xl border border-slate-600/50 bg-slate-900/55 p-3">
          <div className="aspect-video overflow-hidden rounded-xl border border-slate-700/70 bg-slate-950">
            <iframe
              src={stream.embedUrl}
              title="Featured YouTube livestream"
              className="h-full w-full"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <p className="mt-3 px-1 text-xs text-slate-400">
            Note: update <code>embedUrl</code> in <code>app/live/page.tsx</code> with your own YouTube stream/video ID.
          </p>
        </article>

        <article className="rounded-2xl border border-indigo-300/25 bg-slate-900/55 p-5">
          <p className="text-xs uppercase tracking-[0.14em] text-indigo-200/80">Upcoming Streams</p>
          <div className="mt-3 space-y-3">
            {upcoming.map((item) => (
              <div key={`${item.day}-${item.topic}`} className="rounded-xl border border-slate-700/70 bg-slate-950/75 p-3">
                <p className="text-sm font-semibold text-slate-100">{item.topic}</p>
                <p className="mt-1 text-xs text-slate-400">
                  {item.day} • {item.time}
                </p>
              </div>
            ))}
          </div>
        </article>
      </div>

      <article className="mt-6 rounded-2xl border border-slate-600/50 bg-slate-900/55 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs uppercase tracking-[0.14em] text-cyan-200/80">YouTube Highlights</p>
          <Link
            href="https://www.youtube.com/@liveankon1/videos"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-slate-500/60 bg-slate-900/70 px-3 py-1.5 text-xs font-semibold text-slate-200 transition hover:border-cyan-300/50 hover:text-cyan-100"
          >
            See All Videos
          </Link>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {videos.map((video) => (
            <a
              key={video.title}
              href={video.href}
              target="_blank"
              rel="noreferrer"
              className="group rounded-xl border border-slate-700/70 bg-slate-950/80 p-4 transition hover:-translate-y-0.5 hover:border-cyan-300/45"
            >
              <p className="text-xs uppercase tracking-[0.12em] text-cyan-200/70">{video.tag}</p>
              <p className="mt-2 text-sm font-semibold text-slate-100 group-hover:text-cyan-100">{video.title}</p>
            </a>
          ))}
        </div>
      </article>
    </section>
  );
}

